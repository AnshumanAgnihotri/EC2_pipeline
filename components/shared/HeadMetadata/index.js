import Head from 'next/head'


const HeadMetadata = ({ metadata }) => {
  return (
    <Head>
      <title>{metadata.title}</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />

      <link rel="icon" href="/favicon.ico" />
    </Head>
   
  )
}

export default HeadMetadata
