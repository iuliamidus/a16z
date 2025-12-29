📌 Product Requirements Document (PRD)
Social Media Analytics Dashboard (React/Frontend)
1) Project Overview

Objective:
Build an interactive, full-screen analytics dashboard that visualizes social media and company metrics for your selected companies, using data stored in Google Sheets. The dashboard should allow filtering, time-based trend analysis, cross-company comparisons, and actionable insights.

User Persona:

AI/media analyst, product engineer, or growth lead

Goal: monitor, compare, and analyze social presence and news/engagement trends for early-stage AI companies

Needs intuitive visuals, easy filtering, platform-specific and combined views

2) Core Goals

What this dashboard should enable users to do:

Visibility & Overview

See current state metrics across platforms (YouTube, X/Twitter, Instagram, LinkedIn, News, Funding)

Compare companies quickly on audience size, engagement, reach, news coverage, and funding signals

Trend Analysis

Understand growth over time (followers, engagement, posts per week)

Detect sudden spikes/drops — signaling virality, news events, or strategic changes

Cross-Platform Comparisons

Answer questions like:

Which platform do we perform best on?

How does engagement rate differ across platforms?

What patterns emerge in relation to funding announcements?

Insight Generation

Identify which content drives engagement and which platforms are most effective

Spot news impact on engagement and follower growth

3) Metrics to Display & Insights to Surface

Based on industry best practices, you should include key social media metrics that provide visibility into reach, engagement, growth, and conversation quality. These align with standard analytics recommended in sources like Hootsuite and Sprout Social. 
Social Media Dashboard
+1

Reach & Growth
Metric	What it shows
Follower count	Total size of an audience (baseline reach)
Follower growth rate	How quickly audience grows
Subscriber count (YouTube)	Video audience baseline
Reach / Impressions (if available)	How many times content was seen — unique and total

Why: These metrics tell you how big the potential audience is and if the brand is expanding its visibility. 
The Gain Blog

Engagement
Metric	What it shows
Engagement rate	Engagement relative to audience size (likes + comments + shares) 
Social Media Dashboard

Posts per week	Content cadence — important for engagement trends
Total engagements (7d)	Raw interaction count
Avg engagement per post	Post quality indication
Engagement rate change over time	How engagement is evolving

Why: Engagement measures resonance — whether audiences actually interact. Engaged audiences drive brand loyalty and awareness. 
Social Media Dashboard

Content Performance
Metric	What it shows
Latest post date/title	Recency and context
Top posts / videos	Story examples / highest impact content
Video views / avg views	Viewer interest — relevant for YouTube

Why: Beyond numbers, which content actually moves the needle is essential for strategy.

Brand & Media Signals
Metric	What it shows
News mention count (7d)	Current media attention
Unique sources	Breadth of news coverage
Latest mention title	Example headline for context
Funding totals & last round	Business milestones — often tied to media attention
Website traffic / revenue estimates	Real-world business impact signals

Why: Social media doesn’t work in isolation — funding or news events often correlate with spikes in audience and engagement. 
Sprout Social

4) Dashboard User Experience (UX) Design

General Layout (Grid / Full-screen):

┌──────────────────────────────┐
│   Global Filters | Company   │
├──────────────────────────────┤
│   Summary Metrics (KPI Cards)│
├──────────────────────────────┤
│   Time Series Charts         │
├──────────────────────────────┤
│   Detailed Tables & Insights │
└──────────────────────────────┘

A) Header + Filters

Company dropdown (multi-select)

Platform selector (YouTube, X, LinkedIn, Instagram)

Time range selector (last 30d / 90d / 1y / custom)

Compare toggle (side-by-side)

B) KPI Cards (Top Row)

Immersive, high-impact summary of:

Follower counts (multi-platform)

Engagement rates

Mention trends

Funding round signals

C) Trend & Time Series Charts

Followers over time (line)

Engagement rate over time (line)

Posts per week (bar/line)

News mentions frequency (bar)

Synced video views & subscriber growth trends

D) Insight Panels

Table of top posts with engagement

Recent news headlines with source

Correlation markers (e.g., funding date → engagement spike)

5) Technical Architecture

Since your data resides in Google Sheets, a simple frontend can fetch that via Google Sheets API or a published JSON endpoint (CSV/JSON conversion).

Frontend Stack (Recommended)
Layer	Technologies
UI	React (or Next.js)
Charting	Recharts, Chart.js or D3
Data Fetch	Google Sheets API / CSV parsing
State Management	Context / Zustand
Deployment	Vercel / Netlify
Data Flow

Google Sheets → JSON

Use Sheet as data source

Fetch via Google Sheets API or published CSV endpoints

Frontend fetch

Fetch JSON/CSV in React app

Normalize data into uniform shape

Dashboard rendering

Render KPI cards

Render charts

Provide filtering and comparisons

6) Dashboard Filters & Interactions

Company Level Filters

Select one or multiple companies to compare

Compare cross-platform metrics

Time Filters

Weekly, Monthly, Quarterly views

Dynamic date range

Platform Filters

View data from one network or all combined

Platform toggle buttons

Interactive Charts

Hover tooltips explaining social metric context

Clickable legend to show/hide series

Sorting / Ranking Tables

Sort by engagement rate, growth percentage, mention volume

7) Visual & UI Guidelines

According to dashboard-design best practices:
✔ Use consistent color palette
✔ Don’t clutter — prioritize only key metrics per view
✔ Group related metrics together (reach, engagement, content)
✔ Use grid layouts for intuitive scanning
✔ Provide summaries at top left (visual hierarchy) 
datacamp.com

8) Additional Insights & Derived Metrics

You can compute and display:

A) Growth Rates & Trends

Follower growth % (week over week)

Engagement rate change

Video view velocity (views/week)

B) Engagement Quality Metrics

Amplification (shares / followers) 
Social Media Dashboard

Participation (likes + comments per 1K followers)

Mention share of voice vs competitors (if competitor data is present) 
Social Media Dashboard

C) Correlation Signals

Link news spikes to engagement increases

Compare funding events vs follower growth

9) MVP Dashboard Views
View 1 — Company Snapshot

Shows all key metrics for a single company at a glance:

Follower totals

Engagement rates

Recent news

Funding snapshot

View 2 — Cross-Company Comparison

Radar / bar chart:

Follower counts

Engagement rate

Posting frequency

View 3 — Platform Trends

Time series comparing:

YouTube vs LinkedIn vs X engagement growth

10) Optional Enhancements (Phase 2)

Real-time socket updates if you pull live feeds 
codemax.app

Export PDF/CSV report

Sentiment analysis overlay for news mentions

User-defined alerts for spikes


12) Delivery Plan & Milestones
Phase	Deliverable	Time
Phase 0	Data import layer	1–2 days
Phase 1	KPI cards + static tables	2–3 days
Phase 2	Trend charts & filters	3–4 days
Phase 3	Cross-company comparisons	2–3 days
Phase 4	UX polish & deploy	2–3 days
13) Success Criteria

⚡ Dashboard loads in <2s for 10 companies
⚡ Users can filter by company & time range
⚡ Cross-platform comparisons intuitive
⚡ Derived insights (growth/engagement) appear without manual calculation

14) Risks & Mitigations

Data latency / stale data: cache and snapshot in sheets daily

Misalignment across platforms: normalize units (e.g., rate / 1K followers)

Visual clutter: use hideable panels & filters