// Renders a multi-line ACF heading (one textarea line per visual line) with
// <br> between lines, the way the concept hard-codes them.
import { Fragment } from "react";

export default function Lines({ lines }) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}
