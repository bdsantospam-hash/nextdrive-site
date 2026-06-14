import './globals.css';

export const metadata = {
  title: 'DriveNext — A sua próxima viagem começa em família',
  description: 'Compra e venda de viaturas usadas e seminovas em Lisboa, com inspeção certificada, garantia e acompanhamento pessoal.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
