import { Widget, WidgetKey } from "@/types";

const customWidgets: Record<WidgetKey, Widget> = {
  Group: {
    input: {
      required: {},
    },
    output: [],
    output_name: [],
    name: "Group",
    category: "utils",
  },
  Reroute: {
    input: { required: { ["*"]: ["*"] } },
    output: ["*"],
    output_name: [],
    name: "Reroute",
    category: "utils",
  },
};

export default customWidgets;
