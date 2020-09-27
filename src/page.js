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
  const steps = getColumnSteps(kids)
  kids.forEach(kid => {
    if (kid.props.mdxType === "Column") {
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

function getColumnSteps(kids) {
  const steps = kids
    .filter(kid => kid.props.mdxType === "Column")
    .map(kid => React.Children.toArray(kid.props.children))

  const propsById = {}

  steps.forEach((elements, stepIndex) => {
    elements.forEach(element => {
      const { id, height, ...props } = element.props
      if (id == null) return

      if (!(id in propsById)) {
        propsById[id] = Array.from(steps, _ => ({}))
      }

      propsById[id][stepIndex] = props
    })
  })

  return steps.map((elements, stepIndex) => {
    const items = elements.map(element => {
      const {
        id,
        height,
        mdxType,
        ...props
      } = element.props
      if (mdxType === "Browser") {
        let stepsProp = propsById[id]
        if (!stepsProp) {
          stepsProp = Array.from(steps, _ => ({}))
          stepsProp[stepIndex] = props
        }
        const defaultBrowserProps = {}
        return {
          element: (
            <MiniBrowser
              {...defaultBrowserProps}
              steps={stepsProp}
            />
          ),
          height,
          id,
        }
      } else if (mdxType === "Editor") {
        let stepsProp = propsById[id]
        if (!stepsProp) {
          stepsProp = Array.from(steps, _ => ({}))
          stepsProp[stepIndex] = props
        }
        const defaultEditorProps = {
          style: { height: "100%" },
        }
        return {
          element: (
            <MiniEditor
              {...defaultEditorProps}
              steps={stepsProp}
            />
          ),
          height,
          id,
        }
      } else {
        return {
          element,
          height,
          id,
        }
      }
    })
    return { items }
  })
}
