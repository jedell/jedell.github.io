// Error page for unhandled routes
// ----------------------------------------------------------------------
import React from "react";
import { Link } from "react-router-dom";
export default () => {
	return React.createElement(
		"div",
		null,
		React.createElement("h1", null, "Error"),
		React.createElement(
			"p",
			null,
			React.createElement(Link, { to: "/" }, "Home")
		)
	);
};
//# sourceMappingURL=ErrorPage.js.map
