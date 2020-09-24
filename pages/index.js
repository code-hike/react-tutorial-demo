import { Page } from "../src/page"

export default function Index() {
  return (
    <>
      <style jsx global>
        {`
          html {
            line-height: 1.15;
            -webkit-text-size-adjust: 100%;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont,
              Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
              Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            font-weight: 400;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            margin: 0;
            overflow-x: hidden;
            position: relative;
          }

          * {
            margin: 0;
            padding: 0;
          }

          *,
          :after,
          :before {
            box-sizing: inherit;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          ol,
          ul {
            list-style: none;
          }

          img {
            display: inline-block;
            vertical-align: top;
          }
        `}
      </style>
      <Page />
    </>
  )
}
