import s from "./page.module.css"
import Content from "./tutorial.mdx"
import { MDXProvider } from "@mdx-js/react"
import { headings } from "./headings"
import { MiniEditor } from "@code-hike/mini-editor"

export { Page }

function Page() {
  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  )
}

const components = {
  ...headings,
  wrapper: Wrapper,
}

function Wrapper({ children }) {
  const kids = React.Children.toArray(children)
  const sections = [[]]
  kids.forEach(kid => {
    if (kid.props.mdxType === "Column") {
      console.log(kid)
      sections.push([])
    } else {
      sections[sections.length - 1].push(kid)
    }
  })

  console.log({ sections })

  return (
    <article className={s.article}>
      <main>
        {sections.map((sectionChildren, i) => (
          <section key={i} className={i === 1 && s.active}>
            {sectionChildren}
          </section>
        ))}
      </main>
      <aside>
        <div className={s.sticker}>
          <MiniEditor
            code={"console.log(1);"}
            lang="js"
            file="index.js"
          />
        </div>
      </aside>
    </article>
  )
}
