import { FiArrowUpRight, FiTrash2, FiRefreshCcw } from 'react-icons/fi';
import { MassaWallet } from '../Icons/Svg/Massa/MassaWallet';
import { Plugin } from './Plugin';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Plugin',
};
const colorWarning = '#FFA41D';
const args = {
  preIcon: <MassaWallet variant="rounded" size={40} />,
  topAction: (
    <Button onClick={() => console.log('topAction')} variant="toggle">
      on
    </Button>
  ),
  title: `That's is the huge name of the plugin with limit of chars`,
  subtitle: `Author's Name`,
  actions: [
    <Button variant="icon" onClick={() => console.log('reload')}>
      <FiRefreshCcw color={colorWarning} />
    </Button>,
    <Button variant="icon" onClick={() => console.log('arrow')}>
      <FiArrowUpRight />
    </Button>,
    <Button variant="icon" onClick={() => console.log('trash')}>
      <FiTrash2 />
    </Button>,
  ],
};

export const _Plugin = {
  render: () => <Plugin {...args} />,
};