import s from "./page.module.css"
import Content from "./tutorial.mdx"
import { MDXProvider } from "@mdx-js/react"
import { headings } from "./headings"
import { MiniEditor } from "@code-hike/mini-editor"
import { MiniBrowser } from "@code-hike/mini-browser"
import { useSpring } from "use-spring"
import {
  Scroller,
  Step as ScrollerStep,
} from "@code-hike/scroller"
import { SmoothColumn } from "@code-hike/smooth-column"

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
  const sections = []
  const steps = []
  kids.forEach(kid => {
    if (kid.props.mdxType === "Column") {
      console.log(kid)
      steps.push(getStep(kid))
      sections.push([])
    } else {
      sections[sections.length - 1].push(kid)
    }
  })

  const [progress] = useSpring(stepIndex)

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
          <SmoothColumn
            style={{ width: "100%" }}
            steps={steps}
            padding={10}
            progress={progress}
          />
        </div>
      </aside>
    </article>
  )
}

function getStep(element) {
  const items = React.Children.map(
    element.props.children,
    element => {
      if (element.props.mdxType === "Browser") {
        const { id, height, ...props } = element.props
        return {
          element: (
            <MiniBrowser {...props} steps={[{}, {}, {}]} />
          ),
          height,
          id,
        }
      } else if (element.props.mdxType === "Editor") {
        const { id, height, ...props } = element.props
        return {
          element: (
            <MiniEditor
              {...props}
              steps={[{}, {}, {}]}
              style={{ height: "100%" }}
            />
          ),
          height,
          id,
        }
      } else {
        return {
          element,
          height: element.props.height,
          id: element.props.id,
        }
      }
    }
  )
  return {
    items,
  }
}
