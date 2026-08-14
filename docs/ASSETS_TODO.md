# רשימת נכסים — IP PARYENTE SALON

מקור האמת לנתיבים: `content/assets.json`.  
קבצי מקור נוכחיים (לא לשנות): כל הקבצים תחת `photos/`.

העתקה ל־`public/media/` בוצעה ב־Stage 2 (עותקים בלבד; המקור ב־`photos/` לא שונה).

הלוגו הלבן (`logo-light.png`) בשימוש בהדר/פוטר כהים. הוסר CSS invert. הקבצים הם PNG (למרות `_svg` בשם), לא SVG וקטור.

סטטוסים: ✅ HAVE · 🟡 TEMPORARY · ❌ MISSING

עדיפויות: **P1** לפני השקה · **P2** מומלץ מאוד · **P3** שיפור

---

## מיתוג

| סטטוס | שימוש | Section | Filename מומלץ | מידות | יחס | עדיפות | נכס נוכחי | הערות |
|--------|--------|---------|----------------|--------|------|--------|-----------|--------|
| ✅ HAVE | לוגו אתר | Header / Footer | `logo-light.png` | 1672×941 | ~16:9 | P1 | `photos/White_svg.png` | מחובר כ־`branding.logo` בהדר/פוטר. |
| ✅ HAVE | לוגו ריבועי לאינטרנט | שמור, לא בהדר | `logo-web.png` | 1254×1254 | 1:1 | P2 | `photos/web LOGO.png` | הוחלף בחזרה ללוגו הרחב לפי בקשה. |
| ✅ HAVE | לוגו כהה | רקע בהיר | `logo-dark.png` | 1672×941 | ~16:9 | P2 | `photos/Black on white _svg.png` | `branding.logoDark`. |
| 🟡 TEMPORARY | Favicon | Tab | `favicon.png` | הקובץ 1254×1254, לא 32×32; ~538KB | 1:1 | P1 | `photos/Favicon ‏32×32.png` | מחובר. כדאי גרסת 32 קלה יותר. |
| 🟡 TEMPORARY | Apple touch | iOS | `apple-touch-icon.png` | 1254×1254, לא 180×180; ~541KB | 1:1 | P1 | `photos/Apple Touch Icon.png` | מחובר. אידיאלי 180×180. |

---

## Hero

| סטטוס | שימוש | Section | Filename מומלץ | מידות | יחס | עדיפות | נכס נוכחי | הערות |
|--------|--------|---------|----------------|--------|------|--------|-----------|--------|
| 🟡 TEMPORARY | וידאו דסקטופ | S2 Hero | `desktop.mp4` | אידיאלי 1920×1080; כרגע 1024×576 | 16:9 | P1 לשימוש / P2 לשדרוג | WhatsApp MP4 → `hero.video` | ~5 שנ׳, H.264, ~1.16MB. autoplay muted loop playsinline. לא לשלוח אוטומטית לכל מובייל. |
| ❌ MISSING | וידאו HD | S2 Hero | `desktop-hd.mp4` | 1920×1080, 10–15 שנ׳, ≤4MB, בלי סאונד | 16:9 | P2 | — | מקור מהמצלמה עדיף על WhatsApp. |
| ❌ MISSING | פוסטר | S2 Hero | `hero-poster.jpg` | 1920×1080 | 16:9 | P2 | `hero.poster = null` | LCP, reduced-motion, כשל טעינה. |
| 🟡 TEMPORARY | תמונת מובייל / fallback | S2 Hero | `hero-mobile.jpg` בהמשך; כרגע `barbershop.jpeg` | אידיאלי 1080×1920; כרגע 1536×2048 | אידיאלי 9:16; כרגע 3:4 | P1 | `photos/Barbershop.jpeg` → `hero.mobile` | אותו קובץ זמנית גם ל־About. |
| ❌ MISSING | וידאו מובייל (אופציונלי) | S2 Hero | `mobile.mp4` | קצר וקל | 9:16 או 16:9 | P3 | `hero.videoMobile = null` | |

שרשרת נפילה: video → poster → mobile → רקע מערכת העיצוב.

---

## About

| סטטוס | שימוש | Section | Filename מומלץ | מידות | יחס | עדיפות | נכס נוכחי | הערות |
|--------|--------|---------|----------------|--------|------|--------|-----------|--------|
| 🟡 TEMPORARY | פנים המספרה | S3 About | `about-main.jpg` | אידיאלי 1200×1400; כרגע 1536×2048 | אידיאלי ~6:7; כרגע 3:4 | P1 | `photos/Barbershop.jpeg` → `about.main` | זמנית זהה ל־`hero.mobile`. כשתגיע תמונת About נפרדת — לעדכן רק את `about.main`. |

---

## שירותים

מיפוי לפי `id` ב־`content.json`, לא לפי סדר במערך. מידות אידיאליות: 800×1000 (4:5). דסקטופ+מובייל.

| סטטוס | שימוש | Section | Filename מומלץ | עדיפות | נכס נוכחי | הערות |
|--------|--------|---------|----------------|--------|-----------|--------|
| ❌ MISSING | תספורת גברים | S4 / `haircut` | `haircut.jpg` | P2 | `services.haircut = null` | צילום עבודה אמיתית, לא סטוק. |
| ❌ MISSING | עיצוב זקן | S4 / `beard` | `beard.jpg` | P2 | `services.beard = null` | |
| ❌ MISSING | תספורת + זקן | S4 / `combo` | `combo.jpg` | P2 | `services.combo = null` | |
| ❌ MISSING | תספורת ילדים | S4 / `kids` | `kids.jpg` | P2 | `services.kids = null` | רק עם הסכמה. |
| ❌ MISSING | גילוח מסורתי | S4 / `shave` | `shave.jpg` | P2 | `services.shave = null` | |
| ❌ MISSING | צבע / הבהרה | S4 / `color` | `color.jpg` | P3 | `services.color = null` | השירות כרגע `active: false`. |

---

## צוות

מידות אידיאליות: 800×1000 (4:5), רקע ותאורה אחידים. לא לייצר דיוקנאות מזויפים.

| סטטוס | שימוש | Section | Filename מומלץ | עדיפות | נכס נוכחי | הערות |
|--------|--------|---------|----------------|--------|-----------|--------|
| ❌ MISSING | ספר s1 | S5 / `s1` | `s1.jpg` | P2 | `team.s1 = null` | שמות עדיין דמה בתוכן. |
| ❌ MISSING | ספר s2 | S5 / `s2` | `s2.jpg` | P2 | `team.s2 = null` | |
| ❌ MISSING | ספר s3 | S5 / `s3` | `s3.jpg` | P2 | `team.s3 = null` | |

---

## גלריה

יעד: 8–12 תמונות פורטפוליו. `gallery` במניפסט הוא מערך נתיבים בלבד. כרגע `[]`.  
`Barbershop.jpeg` **לא** נכנס לגלריה כברירת מחדל (אווירה/פנים, לא תיק עבודות).

| סטטוס | שימוש | Section | Filename מומלץ | מידות | יחס | עדיפות | הערות |
|--------|--------|---------|----------------|--------|------|--------|--------|
| ❌ MISSING | פריטי גלריה 01–12 | S6 | `01.jpg` … `12.jpg` | 1200×1200 או 4:5 | 1:1 או 4:5 | P2 לארבע–שש ראשונות; P3 להשלמה | פייד, זקן, קלאסי, תוצאה גמורה, תקריב, אווירה. alt נשאר ב־`content.json`. |

---

## באנרים ומיקום

| סטטוס | שימוש | Section | Filename מומלץ | מידות | יחס | עדיפות | נכס נוכחי | הערות |
|--------|--------|---------|----------------|--------|------|--------|-----------|--------|
| ❌ MISSING | באנר שובר | S7 | `gift-bg.jpg` | 2400×1200 | 2:1 | P2 | `sections.gift = null` | רחבה, מרכז נקי. לא לחתוך באגרסיביות את תמונת הפנים. |
| ❌ MISSING | רקע CTA | S10 | `cta-bg.jpg` | 2400×1000 | 2.4:1 | P2 | `sections.cta = null` | |
| ❌ MISSING | חזית העסק | S11 | `storefront.jpg` | 1600×900 | 16:9 | P1 | `sections.storefront = null` | לא להשתמש בפנים כחזית. |

---

## המלצות

| סטטוס | שימוש | Section | Filename מומלץ | מידות | יחס | עדיפות | הערות |
|--------|--------|---------|----------------|--------|------|--------|--------|
| ❌ MISSING | אווטארים | S8 | `avatar-1.jpg` … | 200×200 | 1:1 | P3 | רק תמונות לקוח אמיתיות. אחרת ראשי תיבות. לא להמציא. |

---

## SEO

| סטטוס | שימוש | Section | Filename מומלץ | מידות | יחס | עדיפות | נכס נוכחי | הערות |
|--------|--------|---------|----------------|--------|------|--------|-----------|--------|
| 🟡 TEMPORARY | Open Graph | שיתוף | `og-image.png` | 1729×910 (~1.90:1), ~1.9MB | קרוב ל־1.91 | P1 | `photos/OG.png` | מחובר. אידיאלי 1200×630 וקובץ קל יותר. |

---

## איך מחליפים נכס בהמשך

1. להעתיק את הקובץ לתיקייה המתאימה תחת `public/media/`.
2. לעדכן נתיב אחד ב־`content/assets.json`.
3. בלי לגעת בקומפוננטות.

דוגמה:

```json
"haircut": "/media/services/haircut.jpg"
```

---

## מבנה יעד (Stage 2)

```text
public/media/
  branding/logo.jpeg
  hero/desktop.mp4
  services/
  team/
  gallery/
  sections/barbershop.jpeg
```
