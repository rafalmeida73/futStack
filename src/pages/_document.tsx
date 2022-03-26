import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Tinos:wght@400;700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />

          <meta
            name="description"
            content="Quer bater aquela bolinha semanal com os amigos, no clube, condominio ou no bairro ?
Qual a melhor forma de organizar sua pelada ? Grupos, ligações e e-mail ? Sabemos que a pelada não vive só de futebol, é preciso pagar os campos, organizar times, comprar bola e coletes além de bancar aquele churrasco da resenha para a galera. Se tiver estastisticas, VAR, narração ao Vivo ?"
          />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://fut-stack.vercel.app/" />
          <meta property="og:title" content="FutStack" />
          <meta
            property="og:description"
            content="Quer bater aquela bolinha semanal com os amigos, no clube, condominio ou no bairro ?
Qual a melhor forma de organizar sua pelada ? Grupos, ligações e e-mail ? Sabemos que a pelada não vive só de futebol, é preciso pagar os campos, organizar times, comprar bola e coletes além de bancar aquele churrasco da resenha para a galera. Se tiver estastisticas, VAR, narração ao Vivo ?"
          />
          <meta property="og:image" content="https://fut-stack.vercel.app/metaTags.png" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://fut-stack.vercel.app/" />
          <meta property="twitter:title" content="FutStack" />
          <meta
            property="twitter:description"
            content="Quer bater aquela bolinha semanal com os amigos, no clube, condominio ou no bairro ?
Qual a melhor forma de organizar sua pelada ? Grupos, ligações e e-mail ? Sabemos que a pelada não vive só de futebol, é preciso pagar os campos, organizar times, comprar bola e coletes além de bancar aquele churrasco da resenha para a galera. Se tiver estastisticas, VAR, narração ao Vivo ?"
          />
          <meta property="twitter:image" content="https://fut-stack.vercel.app/metaTags.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />
        </body>
      </Html>
    );
  }
}
