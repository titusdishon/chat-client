import {Tooltip, withStyles} from "@material-ui/core";

export const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#000000',
        color: '#ffffff',
        fontSize: theme.typography.pxToRem(16),
        border: '1px solid #dadde9',
    },
}))(Tooltip);