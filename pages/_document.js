import Document, { Head, Main, NextScript } from "next/document"
import { appInfo } from "../app.config";

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    let {keywords, description, author} = appInfo;

    return (
      <html>
        <Head>
          <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content={ keywords } />
          <meta name="description" content={ description } />
          <meta name="author" content={ author } />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="stylesheet" type="text/css" href="/fonts/css/fontello.css" />
  
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}