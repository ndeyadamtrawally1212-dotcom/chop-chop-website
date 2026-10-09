<div style="display: flex; justify-content: space-between; align-items: baseline;">
    <img src="../../../docs/assets/logo.png" height="25px">
    <h2 style="text-align: left; text-decoration: none; background: none; border-radius: 0; border: none; box-shadow: none; color: #4B5563; font-size: 18px; font-weight: 500; padding-left: 0; margin-top: 10px; text-transform: uppercase">JCC CS200</h2>
</div>

<h2 style="text-align: center; margin-bottom: 30px;">Chop Chop · Style Guide<br><small style="font-weight: 500; color: #4B5563;">Every value you need to match the design</small></h2>

The design handoff for the Tailwind & Vite block (S22 to S24). Chop Chop is a
fictional food-delivery app for the Kombos, and this is its landing page. You
are rebuilding it in Tailwind, one section per session, from the two comps
beside this file and the values below.

**You are not guessing any of these.** Every colour, size and spacing value in
the design is written down here. The colours go in your `@theme` block, by
name, and everything else is a Tailwind utility you look up. That is the whole
method of the block: read the value, find the utility, type the class.

---

## Colours

These are the **only** colours on the page. Your `@theme` block starts with
`--color-*: initial;`, which throws away Tailwind's default palette, and then
declares these fifteen. After that `bg-chop`, `text-ink-3` and
`border-line` exist, and `bg-red-500` does not.

| Use it for                                    | Name                   | Value     |
| --------------------------------------------- | ---------------------- | --------- |
| Buttons, the accent                           | `--color-chop`         | `#ea580c` |
| Button hover · accent text on white and cream | `--color-chop-dark`    | `#c2410c` |
| Accent text **on the dark bands**             | `--color-chop-light`   | `#fb923c` |
| The orange badge background                   | `--color-chop-soft`    | `#ffedd5` |
| Headings · the dark bands                     | `--color-ink`          | `#1c1917` |
| Body text                                     | `--color-ink-2`        | `#44403c` |
| Muted text, kitchen names, delivery times     | `--color-ink-3`        | `#78716c` |
| Page background, cards, the stat card         | `--color-surface`      | `#ffffff` |
| The two tinted bands (hero, Popular)          | `--color-cream`        | `#fdf4e7` |
| Borders and dividers                          | `--color-line`         | `#e7e5e4` |
| The Vegetarian badge text                     | `--color-leaf`         | `#15803d` |
| The Vegetarian badge background               | `--color-leaf-soft`    | `#dcfce7` |
| Text on the dark bands                        | `--color-on-dark`      | `#fafaf9` |
| Muted text on the dark bands                  | `--color-on-dark-soft` | `#a8a29e` |
| Dividers on the dark bands                    | `--color-dark-line`    | `#44403c` |

⚠️ **Three oranges, and they are not interchangeable.** `chop` is the button
background. `chop-dark` is orange *text* on a light background, where `chop`
itself is too light to read. `chop-light` is orange text on the dark bands,
where `chop-dark` disappears. The hero's eyebrow and arrow link sit on cream,
so they are `chop-dark`; the footer's link hover sits on ink, so it is
`chop-light`.

⚠️ **No hex value appears anywhere except inside `@theme`.** In the HTML it is
always the class: `bg-chop`, `text-ink`, `border-line`.

## Type

**Font:** the system stack. It goes in `@theme` as `--font-sans`, which is
what the page gets by default, so nothing in the HTML names a font.

```css
--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

Sizes are Tailwind's own scale. The design uses nine of them:

| Utility     | Size       | Used for                                                          |
| ----------- | ---------- | ----------------------------------------------------------------- |
| `text-xs`   | `0.75rem`  | badges                                                            |
| `text-sm`   | `0.875rem` | nav links, eyebrow, step numbers, kitchen names, captions, footer |
| `text-base` | `1rem`     | body copy, buttons (the default, nothing to type)                 |
| `text-lg`   | `1.125rem` | section ledes, card titles, prices, the logo wordmark             |
| `text-xl`   | `1.25rem`  | step titles                                                       |
| `text-2xl`  | `1.5rem`   | the stat card number                                              |
| `text-3xl`  | `1.875rem` | section headings                                                  |
| `text-4xl`  | `2.25rem`  | the `<h1>` on the phone                                           |
| `text-5xl`  | `3rem`     | the `<h1>` at the wide breakpoint (`lg:text-5xl`)                 |

**Weights:** headings, buttons, prices, step numbers and badges are
`font-semibold` (600). Nothing on the page is `font-bold`.
**Headings:** `tracking-tight`. The `<h1>` is also `leading-tight`.
**The eyebrow:** `uppercase tracking-wide`.
**Ledes and body paragraphs:** never wider than `max-w-prose`.

## Spacing

Tailwind's default scale, where the number is a multiple of `0.25rem`
(`p-5` is `1.25rem`, `gap-10` is `2.5rem`). The values the design uses:

| Where                           | Utilities                                                                                                                                           |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every section's inner width     | `max-w-6xl mx-auto px-5` (`72rem`, centred, `1.25rem` sides)                                                                                        |
| Section padding, top and bottom | `py-20` (`5rem`). The hero is `py-16`, and `lg:py-24`                                                                                               |
| The header                      | `py-4`, `gap-4` between logo and nav                                                                                                                |
| Nav link gaps                   | `gap-x-6 gap-y-2`                                                                                                                                   |
| Beneath a section heading       | `mt-3` to the lede, `mt-12` to the content (`mt-10` for the areas list)                                                                             |
| The hero                        | `mt-3` eyebrow to `<h1>`, `mt-5` to the lede, `mt-8` to the buttons, `gap-5` between the buttons, `lg:gap-16` between text and phone                |
| The three steps                 | `gap-10`, icon `h-20 w-20`, `mt-6` icon to step number, `mt-1` and `mt-2` inside                                                                    |
| Card grid                       | `gap-5`. Card padding `p-5`, `pt-5` above the price row                                                                                             |
| Areas list                      | `gap-4`, `px-5 py-4` inside each row                                                                                                                |
| Buttons                         | `px-5 py-2.5`. The header's is `px-4 py-2`. The card's Add button is `px-4 py-2 text-sm`                                                            |
| Badges                          | `px-2.5 py-0.5`                                                                                                                                     |
| The stat card                   | `px-5 py-4`, `bottom-8`, `left-0` (`lg:left-8`)                                                                                                     |
| The phone                       | `w-56` (`lg:w-72`), centred with `mx-auto`                                                                                                          |
| Footer                          | `py-12`, `gap-10` between brand and link columns, `gap-x-12 gap-y-8` between columns, `gap-2` between links, `mt-10 pt-6` around the copyright rule |

## Shape and motion

| Utility        | Value     | Used for                                     |
| -------------- | --------- | -------------------------------------------- |
| `rounded-xl`   | `0.75rem` | cards                                        |
| `rounded-lg`   | `0.5rem`  | buttons, the stat card, the area rows        |
| `rounded-full` |           | badges                                       |
| `duration-200` | `200ms`   | every transition                             |
| `aspect-3/2`   |           | every dish image, with `w-full object-cover` |

**Borders are `border` (1px) in `border-line`**, or `border-dark-line` on the
dark bands. The nav link underline is `border-b-2`.
**There are no shadows anywhere in this design.**

## Breakpoints

Two, both Tailwind defaults, both `min-width`, both the ones you chose from
content in the HTML & CSS block.

| Prefix | Value   | What changes                                                                                                                                            |
| ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sm:`  | `40rem` | The header goes from stacked to a row. The steps go from stacked to a row. The card grid and the areas list go to two columns. The footer goes to a row |
| `lg:`  | `64rem` | The hero goes side by side, text left and phone right, and its `<h1>` steps up to `text-5xl`. The card grid and the areas list go to three columns      |

⚠️ **Everything without a prefix describes the phone.** A class with `sm:` or
`lg:` in front of it applies at that width *and above*. If you find yourself
reaching for `max-sm:` to undo a desktop layout, start again.

## Hover states

Five, and **every one of them moves.**

| Element        | What happens                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| Nav link       | Underline appears in `chop`, text darkens to `ink`, link lifts `0.125rem` (`hover:-translate-y-0.5`)                |
| Primary button | Background goes to `chop-dark`, button lifts `0.125rem`                                                             |
| Arrow link     | The arrow slides `0.25rem` right (`group-hover:translate-x-1` on the arrow, `group` on the link)                    |
| Dish card      | Card lifts `0.25rem` (`hover:-translate-y-1`)                                                                       |
| Add button     | Fills with `ink`, text goes `on-dark`, border goes `ink`. It does not lift: it sits inside a card that already does |

The Android button on the dark band lifts and its border goes to `on-dark`.
Footer links go to `chop-light` and do not move.

**Focus:** every button and button-shaped link shows a `2px` outline in the
accent, offset by `2px`, **for keyboard focus only**:
`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chop`
(`outline-chop-light` on the dark band).

## Assets

Eleven files, in `assets/`. Use them as they are; do not redraw them.

| File                                       | Where                                                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `logo.svg`                                 | The header, the footer, and the favicon                                                      |
| `phone.svg`                                | The hero. The app screen inside it carries real photographs, credited in `assets/CREDITS.md` |
| `step-1.svg` · `step-2.svg` · `step-3.svg` | The three steps, in that order                                                               |
| `dish-1.svg` … `dish-6.svg`                | The six dish cards, in the order the comp shows them                                         |

The logo and step icons are decorative next to their text, so `alt=""`. The
phone carries a real `alt`. The dish images are decorative too: the card's
heading already names the dish.

## Copy

Every word on the page is in the comp. Type it as it is; the marker is
comparing against the comp, not judging your prose.

---

*By Omar Jasseh*
*Course Instructor*

---

*JCC - Where Users Become Builders*
