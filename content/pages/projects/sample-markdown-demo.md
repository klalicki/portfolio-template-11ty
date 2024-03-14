---
layout: project.njk

thumbnail: /img/sample/markdown-demo.jpg
thumbnailAlt: Thumbnail alt text goes here
description_short: a sample project page showing different ways to format text in Markdown.
description_medium: markdown
eleventyNavigation:
  key: Markdown Demo
  parent: design
  order: 4
---

# Basic Markdown

# Headers

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

Here is a paragraph of text. To style text in _italic_, use _one_ pair of _underscores_ or _asterisks_ around it. To style text in **bold**, use **two** pairs of **underscores** or **asterisks** around it. To style text in **_bold and italic_**, use **_three_** pairs of **_underscores_** or **_asterisks_** around it.

![Markdown logo](/img/sample/markdown-demo.jpg)

## Paragraphs

To create paragraphs, use a blank line to separate one or more lines of text. If you don't use a blank line, the two paragraphs will be combined into one in the output.
This line does not have a blank line before it, so it does not become its own paragraph.

This line does have a blank line before it, so it does become its own paragraph.

If you want to create a 'line break' (think Shift+Enter in InDesign), end a line with two or more spaces.  
The previous line has 2 spaces at the end of it, so this line will show up on its own line.

## Horizontal Line

This is how you create a horizontal line (can be used as a section break in case studies):

---

## Lists

### Ordered list (numbered)

To create an ordered list, start each line with a number followed by a period and a space.

1. This is a list item.
2. This is another list item.
3. This is another list item.

### Unordered List (bullets)

To create a bulleted list, start each line with a dash (-), asterisk (\*), or plus sign (+)

- This is a list item.
- This is another list item.
- This is a third list item.

### Nested lists

To nest a list inside another, put 4 spaces before each line you want to nest.

1. This is the first list item

   - This is an item inside item 1

   - This is another item inside item 1.
   - This is a third item inside item 1.

2. This is the second list item.

   1. you can have a numbered list inside a bulleted list and vice versa.
   2. here's another item.
   3. Here's a third item.

3. etc.

## Links

To create a link, there are two components:

```
[link text](URL)
```

_link text_ refers to the text that appears in the browser, while _URL_ is the web address you want the link to go to.

For example:

```
[Google](https://www.google.com)
```

will produce the following link:

[Google](https://www.google.com)

### Shortcut

If the link text and url are the same, you can just surround the link in angle brackets `< >`

For example:

```
<https://www.google.com>
```

produces the link <https://www.google.com>.

For this to work, it must be a full URL - it must include http:// or https:// at the start.

# Advanced Markdown {#section-advanced-markdown}

## Using HTML Tags in Markdown:

In this site generator (11ty.js) Markdown is processed and rendered into HTML. If you place valid HTML code within a Markdown file, it will _probably_ work.

One common use for this would be to place an embed code (ie for Youtube, Vimeo, Figma, Issuu) in a project page.

## Embedding a YouTube video

This site generator also now has a plugin installed to automatically convert YouTube links into embed codes. To place a YouTube video, just copy its URL and place it on its own line. ex:

```
here is some text

https://www.youtube.com/embed/dQw4w9WgXcQ

here is some more text
```

https://www.youtube.com/embed/dQw4w9WgXcQ

## Custom Classes and IDs (for custom CSS styling)

This site is set up to use [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs), a package which allows you to add custom CSS classes and IDs to elements.

What this means is that you are able to add your own CSS and style any element however you want. To add a CSS class/ID to an element, put it inside curly brackets at the end of a line.

```
#### This is a sample line of red text{.red-text}

<style>.red-text{
  color:red
  }</style>
```

will produce:

#### This is a sample line of red text {.red-text}

<style>.red-text{
  color:red
  }</style>

Notice that I used a style tag to add the color to that element. This works well if you are only adding custom CSS to a few elements on a page. If you find yourself adding the same custom CSS to multiple pages, you can add it to the **theme custom CSS file (NOT ADDED YET)**

### Jump Links

You can use custom IDs to create jump links within a page. I added the ID _#section-advanced-markdown_ to one of the headers above, which means I can link to it with the following link:

```
[Advanced Markdown Section](#section-advanced-markdown)
```

[Advanced Markdown Section](#section-advanced-markdown)
