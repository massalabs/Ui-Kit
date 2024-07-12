import { IAccount, IProvider } from '@massalabs/wallet-provider';
import { SUPPORTED_MASSA_WALLETS } from '../../massa-react/const';

async function handleBearbyAccountChange(
  newAddress: string,
  store: AccountStoreState,
) {
  const { connectedAccount, currentProvider, setConnectedAccount } = store;

  const oldAddress = connectedAccount?.address();

  if (newAddress !== oldAddress) {
    const newAccounts = await currentProvider?.accounts();

    if (newAccounts?.length) {
      // Bearby returns only one account
      const newAccount = newAccounts[0];
      setConnectedAccount(newAccount);
    }
  }
}

export interface AccountStoreState {
  connectedAccount?: IAccount;
  accounts?: IAccount[];
  currentProvider?: IProvider;
  providers: IProvider[];
  isFetching: boolean;
  accountObserver?: {
    unsubscribe: () => void;
  };
  networkObserver?: {
    unsubscribe: () => void;
  };
  chainId?: bigint;

  setCurrentProvider: (provider?: IProvider) => void;
  setProviders: (providers: IProvider[]) => void;

  setConnectedAccount: (account?: IAccount) => void;
}

const accountStore = (
  set: (params: Partial<AccountStoreState>) => void,
  get: () => AccountStoreState,
) => ({
  accounts: undefined,
  connectedAccount: undefined,
  accountObserver: undefined,
  networkObserver: undefined,
  currentProvider: undefined,
  providers: [],
  isFetching: false,
  chainId: undefined,

  setCurrentProvider: (currentProvider?: IProvider) => {
    try {
      set({ isFetching: true });

      const previousProvider = get().currentProvider;

      if (previousProvider?.name() !== currentProvider?.name()) {
        get().accountObserver?.unsubscribe();
        get().networkObserver?.unsubscribe();
        set({ accountObserver: undefined, networkObserver: undefined });
      }
      if (!currentProvider) {
        set({
          currentProvider: undefined,
          connectedAccount: undefined,
          accounts: undefined,
        });
        return;
      }

      if (!get().networkObserver) {
        const networkObserver = currentProvider.listenNetworkChanges(
          async () => {
            set({ chainId: await currentProvider.getChainId() });
          },
        );
        set({ networkObserver });
      }

      if (currentProvider?.name() === SUPPORTED_MASSA_WALLETS.BEARBY) {
        currentProvider
          .connect()
          .then(() => {
            // get current network
            currentProvider
              .getChainId()
              .then((chainId) => {
                set({ chainId });
              })
              .catch((error) => {
                console.warn('error getting network from bearby', error);
              });
            // subscribe to network events
            const observer = currentProvider.listenAccountChanges(
              (newAddress: string) => {
                handleBearbyAccountChange(newAddress, get());
              },
            );
            set({ currentProvider, accountObserver: observer });

            // get connected account
            currentProvider
              .accounts()
              .then((accounts) => {
                // bearby expose only 1 account
                get().setConnectedAccount(accounts[0]);
                set({ accounts });
              })
              .catch((error) => {
                console.warn('error getting accounts from bearby', error);
              });
          })
          .catch((error) => {
            console.warn('error connecting to bearby', error);
          });
        return;
      }

      set({ currentProvider });

      currentProvider
        .accounts()
        .then((accounts) => {
          set({ accounts });

          const selectedAccount = accounts[0];
          get().setConnectedAccount(selectedAccount);
        })
        .catch((error) => {
          console.warn('error getting accounts from provider', error);
        });
    } finally {
      set({ isFetching: false });
    }
  },

  setProviders: (providers: IProvider[]) => {
    set({ providers });

    // if current provider is not in the new list of providers, unset it
    if (!providers.some((p) => p.name() === get().currentProvider?.name())) {
      set({
        currentProvider: undefined,
        connectedAccount: undefined,
        accounts: undefined,
      });
    }
  },

  // set the connected account, and update the massa client
  setConnectedAccount: async (connectedAccount?: IAccount) => {
    set({ connectedAccount });
  },
});

export default accountStore;
