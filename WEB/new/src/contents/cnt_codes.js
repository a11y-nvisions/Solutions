export const CodeDict={
"rTree" : `<element role="tree">`,
"rTreeItem" : `<element role="treeitem">`,
"rGroup" : `<element role="group">`,
"rNone":`<element role="none">`,
"rTablist":`<element role="tablist">`,
"rTab":`<element role="tab">`,
"rTabpanel":`<element role="tabpanel">`,

"nRadio" : `<input type="radio">`,
"nCheckbox" : `<input type="checkbox">`,
"nEdit" : `<input type="text">`,

"attr_rTree" : `role="tree"`,
"attr_rTreeItem" : `role="treeitem"`,
"attr_rGroup" : `role="group"`,
"attr_rTablist" : `role="tablist"`,
"attr_rTabpanel" : `role="tabpanel"`,
"attr_rTab" : `role="tab"`,
"attr_rNone":`role="none"`,
"attr_tabidx_0" : `tabindex="0"`,
"attr_tabidx_m1" : `tabindex="-1"`,
"attr_aLabel":`aria-label="Text"`,
"attr_aLabelledby":`aria-labelledby="IDREF"`,
"attr_aOrientation":`aria-orientation="horizontal|vertical"`,
"attr_aSelected":`aria-selected="true|false"`,
"attr_aChecked":`aria-checked="true|false|mixed"`,
"attr_aPressed":`aria-pressed="true|false"`,
"attr_aExpanded":`aria-selected="true|false"`,
"attr_aControls":`aria-controls="IDREF"`,

"aLabel":`<element aria-label="Text">`,
"aLabelledby":`<element aria-labelleby="IDREF">`,
"aOrientation":`<element aria-orientation="horizontal|vertical">`,
"aControls":`<element aria-controls="IDREF">`,
"aChecked":`<element aria-checked="true|false|mixed">`,
"aPressed":`<element aria-pressed="true|false">`,
"aExpanded":`<element aria-selected="true|false">`,
"aSelected":`<element aria-selected="true|false">`,


"tag_ul":`<ul>`,
"tag_ol":`<ol>`,
"tag_li":`<li>`,
"tag_p":`<p>`,
"tag_div":`<div>`,
"tag_anchor":`<a>`,
"tag_button":`<button>`,
"tag_input":`<input>`,




"ex-Treeview":`<ul role="tree">
    <li role="treeitem" tabindex="0">
        아이템1
        <ul role="group">
            <li role="treeitem">아이템1-서브1</li>
            <li role="treeitem">아이템1-서브2</li>
        </ul>
    </li>
    <li role="treeitem">...</li>
    <li role="treeitem">...</li>
</ul>`,

"ex-tab":`<ul role="tablist" aria-orientation="horizontal">
    <li role="tab" tabindex="0" aria-selected="true" aria-controls="tabpanel-1">1페이지</li>
    <li role="tab" aria-controls="tabpanel-2">...</li>
    <li role="tab"  aria-controls="tabpanel-3">...</li>
</ul>
<div id="tabpanel-1" tabindex="0">...</div>
<div id="tabpanel-2" tabindex="0">...</div>
<div id="tabpanel-3" tabindex="0">...</div>
`,
}