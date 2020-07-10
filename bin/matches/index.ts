import { valueMustBeEqual } from "./valueMustBeEqual"
import { attributeValueMustBeSame } from "./attributeValueMustBeSame"
import { mustHaveAnAttribute } from "./mustHaveAnAttribute"
import { sameTextContents } from "./sameTextContents"
import { textContentEqual } from "./textContentEqual"
import { typeMustBe } from "./typeMustBe"

const extenders = {
  valueMustBeEqual, attributeValueMustBeSame,
  mustHaveAnAttribute, sameTextContents,
  textContentEqual, typeMustBe
}


export default extenders