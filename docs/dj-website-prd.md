# DJ Portfolio & Booking Website – Product Requirements Document (PRD)

## 1. Product overview

**Product name**  
DJ [Name] – Portfolio & Booking Website

**Summary**  
A responsive web app for an upcoming DJ that showcases his work (mixes, live videos, photos, past gigs) and provides a simple, professional way for clients (clubs, bars, weddings, private events) to see his availability and request/book gigs online. The site includes a public events calendar, upcoming shows list, embedded music/video, and a booking form tied to an availability-aware calendar.

**Type**  
Marketing/portfolio + lightweight booking system (MVP, single talent).

**Primary platforms**  
- Web (desktop and mobile web, responsive)

---

## 2. Goals and non‑goals

### 2.1 Goals

1. **Generate bookings**  
   Make it easy for promoters, event planners, and individuals to submit high‑quality booking requests via a clear booking page and form.
2. **Showcase the DJ’s work and credibility**  
   Display embedded mixes, tracks, and live videos, plus a gallery and calendar of upcoming shows so visitors quickly see he’s active and competent.
3. **Expose availability at a glance**  
   Provide a public calendar view of booked shows and basic availability so prospects can choose dates intelligently.
4. **Present a professional brand**  
   Clean, mobile‑friendly design that looks legit to both club bookers and wedding/private clients.

### 2.2 Non‑goals (MVP)

- Full multi‑DJ marketplace or agency management (only 1 DJ profile).
- Automated contract generation and payment processing (can be added later or via external tool link).
- Deep CRM/marketing automation (email campaigns, funnels, etc.).
- Complex multi‑language support (start with one language).

---

## 3. Target users and use cases

### 3.1 Primary users

1. **Venue owners / club promoters**  
   Need to quickly assess style, professionalism, and availability for specific nights.
2. **Wedding couples / private event hosts**  
   Need assurance he can handle diverse audiences, read the room, and is reliable.
3. **Corporate / event planners**  
   Need a professional‑looking DJ profile with clear info, media, and simple booking.

### 3.2 Secondary users

- Fans/friends who want to see where he’s playing next or listen to his mixes.
- The DJ himself (admin) managing calendar, content, and availability.

### 3.3 Key jobs-to-be-done (JTBD)

- “As a club promoter, I want to see what he sounds like and whether my target crowd will enjoy his set before reaching out.”
- “As a bride/groom, I want to quickly check if my date is available and send one clear inquiry with all event details.”
- “As the DJ, I want a simple way to keep my public calendar updated so I don’t get inquiries for dates that are already booked.”

---

## 4. Scope and high‑level features

### 4.1 In‑scope (MVP)

- Marketing site with essential pages:
  - Home
  - About
  - Gigs & Availability (calendar + upcoming shows)
  - Music & Video
  - Services & Rates
  - Contact / Book Me
- Public events calendar (read‑only to visitors).
- Booking request form with required event details.
- Embed support for SoundCloud/Mixcloud/YouTube/Spotify players.
- Basic admin interface for the DJ to:
  - Manage events (create/edit/delete).
  - Manage media (links to mixes and videos).
  - Manage content (copy, images).
- Basic email notification flow (new booking request → email to DJ).

### 4.2 Out‑of‑scope (MVP)

- In‑site messaging/chat between DJ and clients.
- Automated availability sync with external calendars (Google/Outlook).
- Built‑in payment processing and contract e‑signing (handled via manual follow‑up or future integration).
- Full CRM capabilities.

---

## 5. Information architecture

### 5.1 Sitemap

- `/` – Home  
- `/about` – About  
- `/gigs` – Gigs & Availability  
- `/music` – Music & Video  
- `/services` – Services & Rates  
- `/contact` – Contact / Book Me  

Admin (authenticated, non‑indexed):

- `/admin` – Dashboard / overview  
- `/admin/events` – Manage events (CRUD)  
- `/admin/media` – Manage music/video embeds  
- `/admin/content` – Manage static content + hero, bios, etc.

---

## 6. Detailed feature requirements

### 6.1 Home page

**Purpose**  
Quickly communicate who he is, what types of gigs he does, and drive users to either listen or book.

**Key components**

1. **Hero section**
   - Background: image or short loop video of him DJing.
   - Copy:
     - Headline: “[City] DJ for Clubs, Weddings & Private Events.”
     - Subhead: 1–2 sentences about style and reliability.
   - Primary CTA button: “Check availability / Book me.”
   - Secondary CTA: “Listen to my mixes.”

2. **Quick services overview**
   - 3 cards:
     - Clubs & Bars
     - Weddings & Private Events
     - Corporate & Other
   - Each with 1–2 bullet points (what to expect).

3. **Upcoming shows teaser**
   - List of next 3–5 public events pulled from `/gigs`:
     - Date, venue, city, “Details” link.

4. **Media teaser**
   - 1–2 embedded audio players (featured mix).
   - 1 featured live video thumbnail.

5. **Micro social proof**
   - Small testimonial quote or logos of venues (if any).
   - Link to full testimonials or About.

**Acceptance criteria**

- Hero visible and readable on mobile and desktop.
- Primary CTA button scrolls or routes to booking page.
- Upcoming events auto‑hide when date is past.
- Embedded media plays correctly across modern browsers.

---

### 6.2 About page

**Purpose**  
Build personal connection and credibility.

**Content**

- 1–2 high‑quality images of the DJ (portrait and performance).
- Bio covering:
  - Origin story and influences.
  - Genres and typical crowds.
  - Regions he covers.
- “What I offer” short list:
  - Clubs (open‑format, genre notes).
  - Weddings (MCing optional, playlists).
  - Private/Corporate (tone, professionalism).
- Links to Services and Contact.

**Acceptance criteria**

- Content manageable via admin (no code changes).
- Images responsive and optimized for mobile.

---

### 6.3 Gigs & Availability page

**Purpose**  
Show where he’s playing and what dates are available, reducing back‑and‑forth.

**User‑facing components**

1. **Calendar view**
   - Month view with:
     - Booked dates highlighted.
     - Hover or click shows event summary (for public events).
   - Legend:
     - Booked
     - Tentative / hold (optional)
     - Available

2. **Upcoming gigs list**
   - List view of next N public events:
     - Date
     - Venue
     - City
     - Event type (Club, Wedding, Private)
     - Optional: link to external event page/tickets.

3. **Availability note**
   - Short static text like: “Now booking dates from [month/year] onward.”

4. **Inline booking CTA**
   - Button “Request this date” that routes to Contact with prefilled date when user clicks a date.

**Admin functionality**

- Create/edit/delete events with fields:
  - Title
  - Date, start time, end time
  - Venue, city
  - Event type (enum)
  - Status (booked / tentative / hold)
  - Visibility (public/private)
  - External URL (optional)
- Only events marked `visible = true` appear in public list; all events block the date on calendar.

**Acceptance criteria**

- Public calendar displays events correctly by date and status.
- Clicking a date pre‑fills that date in booking form (if not in the past).
- Past events remain visible in list until after event date, then move to “past events” or hide.

---

### 6.4 Music & Video page

**Purpose**  
Showcase his sound and live vibe to persuade booking decision.

**User‑facing components**

1. **Audio section**
   - List of mixes/tracks grouped by context:
     - “Club / Nightlife”
     - “Weddings & Events”
   - Each item:
     - Title
     - Short description
     - Embedded player (SoundCloud/Mixcloud/Spotify).

2. **Video section**
   - Embedded YouTube / Vimeo videos:
     - Clips of live performances, crowd shots, or promo videos.
   - Grid or list layout.

3. **Booking CTA**
   - “Like what you hear? Book me” button persistently in view.

**Admin functionality**

- CRUD for media items:
  - Title
  - Description
  - Type (audio/video)
  - Platform
  - Embed URL or ID
  - Category tags (club, wedding, etc.)
  - Sort order

**Acceptance criteria**

- All embeds render correctly on desktop and mobile.
- Page performs reasonably (lazy load embeds or paginate when many items).

---

### 6.5 Services & Rates page

**Purpose**  
Clearly explain what gigs he takes and set expectations on pricing.

**User‑facing components**

1. **Intro**  
   One paragraph summarizing types of gigs and general positioning (versatile, upcoming, hungry).

2. **Service sections**

- **Clubs & Bars**
  - Description (open‑format, genres, can adapt to venue).
  - Typical set length.
  - Notes on gear (uses club gear / can bring controller).
  - “Starting from [price]” or “Contact for quote – typical range [X–Y].”

- **Weddings & Private Events**
  - Description (ceremony + cocktail + reception package, MCing).
  - Options (just reception vs full day).
  - Gear: can arrange sound/lighting.
  - “Starting from…” or price range.

- **Corporate & Other**
  - Similar structure.

3. **FAQ (optional)**
   - 3–5 questions:
     - “Do you take requests?”
     - “What are your technical requirements?”
     - “Do you travel outside [city]?”

4. **Booking CTA**
   - “Get a custom quote” button linking to booking form.

**Admin functionality**

- Manage copy and pricing ranges from admin.

**Acceptance criteria**

- Clear separation of service types.
- All prices editable without code.

---

### 6.6 Contact / Book Me page

**Purpose**  
Convert interest into actionable booking requests with all relevant information captured.

**User‑facing components**

1. **Intro text**
   - Short text explaining process:  
     “Fill out this form and I’ll get back to you within 24 hours with availability and a quote.”

2. **Booking form fields** (required unless noted)

- Contact info:
  - Name
  - Email
  - Phone

- Event details:
  - Event type (select: Club/Bar, Wedding, Private, Corporate, Other)
  - Event date (date picker)
  - Start time, end time
  - Venue name (text)
  - City (text)
  - Guest count (optional)
  - Budget range (dropdown, e.g., `<$500`, `$500–$1000`, etc.)

- Preferences:
  - Music style / genres (multi‑select or free text)
  - Must‑play / do‑not‑play notes (optional)
  - Additional details (textarea)

3. **Submission behavior**
   - Show success message: “Thanks! I’ll reply within 24 hours.”
   - Send email notification to DJ with all form data.
   - Optionally save submission to DB for admin review.

4. **Calendar context**
   - Optional mini calendar or note: “Currently booked dates appear in red; feel free to inquire about any other date.”

**Acceptance criteria**

- Form validates required fields with user‑friendly errors.
- Submissions send email to configured DJ email.
- Past dates cannot be selected.

---

### 6.7 Admin panel

**Purpose**  
Allow DJ to manage content without developer intervention.

**Core sections**

1. **Dashboard**
   - Summary:
     - Upcoming events
     - Recent booking requests
   - Quick links to add event, media, edit hero.

2. **Events management**
   - List view with filters (future/past, public/private, type).
   - Form to create/edit event (fields as described above).
   - Delete action with confirmation.

3. **Media management**
   - List of media.
   - Form to create/edit:
     - Title, description, type, platform, embed URL, tags.

4. **Content management**
   - Editable fields for:
     - Hero text (headline, subhead).
     - About page content.
     - Services/FAQ text.
     - Contact/booking intro text.
   - Image upload for hero and about.

**Acceptance criteria**

- Admin requires authentication.
- All changes reflect immediately or after simple cache bust.

---

## 7. Non‑functional requirements

### 7.1 Performance

- Pages (without heavy media) should load initial content in under ~2 seconds on a typical 4G mobile connection.
- Images optimized (responsive sizes, compression).
- Lazy load embedded players and videos below the fold.

### 7.2 Security

- HTTPS enforced.
- Basic rate limiting or spam protection on booking form (e.g., simple CAPTCHA or token).
- Admin area protected with strong password and sessions.

### 7.3 Reliability

- Booking form should have high uptime; if email fails, store submissions in DB and mark them for admin review.
- Calendar and event data should be consistent across home, gigs page, and booking context.

### 7.4 Responsiveness & accessibility

- Fully responsive layout for mobile, tablet, and desktop.
- Accessible color contrast and alt text for key images.
- Forms keyboard‑navigable and screen‑reader friendly.

---

## 8. Analytics and success metrics

### 8.1 Key metrics

- Number of unique visitors per month.
- Click‑through rate on primary “Book me” CTAs.
- Booking form submissions per 100 unique visitors.
- Conversion percentage from visitors who view calendar → submit booking form.
- Source breakdown: direct, social, search (tag links appropriately).

### 8.2 Instrumentation

- Basic analytics tool.
- Event tracking:
  - Hero CTA clicks.
  - Play events on embedded media (where possible).
  - Booking form submissions and validation errors.

---

## 9. Phasing / roadmap (high‑level)

**Phase 1 (MVP)**  
- Core pages (Home, About, Gigs, Music, Services, Contact).
- Static availability calendar + manual event management.
- Booking form with email + DB storage.
- Simple admin for events, media, content.

**Phase 2 (Nice‑to‑have)**  
- External booking software integration.
- Google Calendar sync.
- Basic testimonials/reviews page.

**Phase 3**  
- Online payments and contracts.
- Multilingual support.
