import * as React from "react"
import { ShowIfProps } from "."
import { overrideProperty } from "../../../utils/helpers"

const ShowIf: React.FC<{ showIfProps: ShowIfProps }> = (props) => {
 
  const [showIfValue, setShowIfValue] = React.useState({})

  props.showIfProps.pubsub.addSubscriber(
    props.showIfProps.eventName,
    (data: any) => {
      setShowIfValue(data)
    }
  )

  return (
    <>
      {React.Children.map(props.children, (child: any, index) => {
        let _props = child.props
        overrideProperty(_props, "showIfValue", showIfValue)
        overrideProperty(_props, "eleRef", props.showIfProps.eleRef)
        overrideProperty(_props, "validators", props.showIfProps.validators)
        overrideProperty(_props, "formDataSetters", props.showIfProps.formDataSetters)
        overrideProperty(_props, "pubsub", props.showIfProps.pubsub)
       
        return React.cloneElement(child, { ..._props })
      })}
    </>
  )
}

export default ShowIf
