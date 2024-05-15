import '@mantine/core/styles.css';
import { AppProps } from "next/app";
import { MantineProvider } from '@mantine/core';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider>
        <Component {...pageProps} />
    </MantineProvider>
  );
};

export default App;
