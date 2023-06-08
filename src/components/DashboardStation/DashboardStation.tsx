// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import { ReactNode, useEffect } from 'react';
import { useLocalStorage } from './../../util/useLocalStorage';

export interface IDashboardStationProps {
  imagesDark: ReactNode[];
  imagesLight: ReactNode[];
  components: ReactNode[];
}

export function DashboardStation(props: IDashboardStationProps) {
  let { imagesDark, imagesLight, components } = props;
  const [storedTheme] = useLocalStorage<string>('massa-station-theme', 'dark');
  const [images, setImages] = React.useState<ReactNode[]>([]);

  useEffect(() => {
    function loadImages() {
      let listeImage: ReactNode[] = [...components];

      const diff = imagesDark.length - components.length;
      for (let i = 0; i < diff; i++) {
        const imageToAdd =
          storedTheme === 'dark' ? imagesDark[i] : imagesLight[i];
        listeImage.push(imageToAdd);
      }

      setImages(listeImage);
    }

    loadImages();
  }, [storedTheme]);

  return (
    <div
      className="grid lg:grid-cols-6 grid-cols-3 grid-rows-2 gap-8"
      data-testid="dashboardStation"
    >
      <div className="col-span-2 row-span-2">{images[0]}</div>
      <div className="col-start-3">{images[1]}</div>
      <div className="col-start-3 row-start-2">{images[2]}</div>
      <div className="row-start-3 lg:col-span-2 lg:row-span-2 lg:col-start-4 lg:row-start-1">
        {images[3]}
      </div>
      <div className="col-start-1 row-start-4 lg:col-start-6 lg:row-start-1">
        {images[4]}
      </div>
      <div
        className="col-span-2 row-span-2 col-start-2 row-start-3
      lg:col-span-1 lg:row-span-1 lg:col-start-6 lg:row-start-2"
      >
        {images[5]}
      </div>
    </div>
  );
}
