import s from "./page.module.css"
import Content from "./tutorial.mdx"
import { MDXProvider } from "@mdx-js/react"
import { headings } from "./headings"

export { Page }

function Page() {
  return (
    <article className={s.article}>
      <header>
        <h1>Tutorial: Intro to React</h1>
      </header>
      <main>
        <MDXProvider components={components}>
          <Content />
        </MDXProvider>
      </main>
    </article>
  )
}

const components = {
  ...headings,
}
