import s from "./page.module.css"
import Content from "./tutorial.mdx"
import { MDXProvider } from "@mdx-js/react"
import { headings } from "./headings"
import { MiniEditor } from "@code-hike/mini-editor"
import {
  Scroller,
  Step as ScrollerStep,
} from "@code-hike/scroller"

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
  const [stepIndex, setIndex] = React.useState(0)
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
        <Scroller onStepChange={setIndex}>
          {sections.map((sectionChildren, i) => (
            <ScrollerStep
              as="section"
              key={i}
              index={i}
              className={
                i === stepIndex ? s.active : undefined
              }
            >
              {sectionChildren}
            </ScrollerStep>
          ))}
        </Scroller>
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
