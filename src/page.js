import s from "./page.module.css"
import Content from "./tutorial.mdx"

export { Page }

function Page() {
  return (
    <article className={s.article}>
      <header>
        <h1>Tutorial: Intro to React</h1>
      </header>
      <main>
        <Content />
      </main>
    </article>
  )
}
