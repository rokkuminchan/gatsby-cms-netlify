import React from "react";

import { toMarkdown } from "../markdownHelper"
import data from "../data/members/new-member.json";

let marked = require("marked");

const MarkdownView = ({ props }) => {
    console.log(marked(toMarkdown(data.body)))

    return <div
        dangerouslySetInnerHTML={{
            __html: marked(toMarkdown(data.body)),
        }}
    ></div>
}

export default MarkdownView;