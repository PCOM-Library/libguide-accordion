# LibGuides Accessible "Accordion" Without Bootstrap
This small code set allows you to add an accessible "accordion" to a LibGuides content box with minimal effort. I put the word "accordion" in quotes in that an accordion traditionally allows only one panel to be open at a time. This is not always desirable as it induces a cognitive access burden if a user needs information in multiple panels at the same time, they have to rely on memory or repeatedly flip between two panels. To avoid the nuance needed to determine when a true accordion is needed, I chose a universal design approach of defaulting to letting any number of panels be open at a time.

This library also avoids using the Bootstrap framework as much as is possible in LibGuides, due in part to keep it a clean, accessible build with minimal complexity. 

## Deployment
Download he JavaScript and CSS files and upload them to LibGuides. Be sure to link to the two files in your system settings. The code will not impact your pages unless you tell it to.

In a guide, create a content box with a rich text section. Use `Heading 3` lines of text to mark what will be your disclosure buttons. Any rich text content (including HTML source) after the heading will be in the panel. 

At some point, open the source editor for the content and add two lines of HTML to mark the content as an accordion. At the top of the code add
```
<div class="pcom-accordion-wrapper">
```
and add the following code at the bottom:
```
</div>
```
Your code will look like:
```
<div class="pcom-accordion-wrapper">
<h3>...</h3>
[html content]
<h3>...</h3>
[html content]
</div>
```

Voila, the accordion will work on the live page. Here's an [example of the accordion in action](https://libguides.pcom.edu/research_week/faqs#s-lg-box-13747263) (link added 2024-07-30). 

## Caveats
* The accordion is not "live" or active in the editor view of the page. It will only work on the preview and live version of the guide page. This enables you to readily edit the content of the buttons (in the Heading 3) and the panel content.
* The accordion has to be contained in a single rich text format bit in a box. This doesn't stop you from having multiple rich text objects in a row all with their own accordions. This is another reason we don't force a true accordion experience of only one panel open at once.
* You will need to manually adjust the CSS likely because the provided code uses PCOM variables for branding needs. I would love to see someone generalize the CSS with variables to make customization easier.
* A drawback of accordions is that content in closed panels will generally not be reported when searching for text in a page. There are W3C proposals to address this, but nothing is consistent across browsers at this time.
* Panels will not be open when a page is printed. A print media CSS file could address this is desired.
