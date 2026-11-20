import type { Lesson, Module } from '../types'

const lesson = (l: Lesson): Lesson => l

export const MODULES: Module[] = [
  {
    id: 'awakening',
    slug: 'awakening',
    order: 1,
    title: 'The Awakening',
    arabic: 'اليقظة',
    subtitle: 'From trying to becoming',
    thesis:
      'You cannot build a new life on the identity of the old one. The first work is seeing clearly — without despair and without excuses.',
    lessons: [
      lesson({
        id: 'l1',
        slug: 'the-gap',
        order: 1,
        moduleId: 'awakening',
        title: 'The Gap',
        subtitle: 'Why knowing better has never been enough',
        minutes: 6,
        bigIdea:
          'The distance between what you know and what you do is not closed by more knowledge. It is closed by structure you keep when you do not feel like it.',
        blocks: [
          {
            kind: 'p',
            text: 'There is a particular pain in knowing exactly what you should do and watching yourself not do it. It is not ignorance. You know Fajr is better than the snooze. You know the scroll is spending hours you will never earn back. You know the work you keep postponing is the work that would change your life. And still.',
          },
          {
            kind: 'p',
            text: 'That gap — between knowledge and action — is what this program is built to close. Not with a louder reminder. With a system.',
          },
          { kind: 'h', text: 'The gap is structural, not moral' },
          {
            kind: 'p',
            text: 'If the gap were a character flaw, guilt would have fixed it by now. Guilt is a signal, not a strategy. What is usually missing is structure: a defined standard, a daily rhythm, a way back after failure, and someone who notices.',
          },
          {
            kind: 'p',
            text: 'Motivation is weather. Structure is climate. You do not need to feel ready. You need a day that tells you what to do next.',
          },
          {
            kind: 'ayah',
            arabic: 'إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ',
            translation:
              'Indeed, Allah will not change the condition of a people until they change what is in themselves.',
            source: 'Qur’an 13:11',
          },
          { kind: 'h', text: 'What the gap actually costs' },
          {
            kind: 'list',
            items: [
              'Years that look busy but produce nothing you can point to.',
              'Self-respect that erodes quietly, one broken promise to yourself at a time.',
              'Barakah leaking out of a life that is always behind.',
              'The version of you your family, your ummah, and your future needed.',
            ],
          },
          { kind: 'h', text: 'The one honest look' },
          {
            kind: 'p',
            text: 'You are not here to try harder this time. You are here to stop negotiating with a version of yourself that has already proven it will choose comfort. Today’s work is not to feel inspired. It is to look — clearly, briefly, and without collapsing into shame.',
          },
          {
            kind: 'quote',
            text: 'Take account of yourselves before you are taken to account, and weigh your deeds before they are weighed.',
            source: 'Umar ibn al-Khattab (ra)',
          },
          {
            kind: 'p',
            text: 'Shame says: you are the gap. Truth says: you have a gap, and gaps can be built over.',
          },
        ],
        drills: [
          {
            id: 'l1-cost',
            title: 'The cost ledger',
            instruction:
              'Write five specific things the gap has cost you in the last twelve months. Not generalities — names, opportunities, nights, relationships, money, peace.',
            cadence: 'once',
            minutes: 10,
          },
          {
            id: 'l1-audit',
            title: 'Honest baseline',
            instruction:
              'Rate yourself 1–10 on salah consistency, Quran, sleep, focus, and control of desire. Write one sentence of evidence for each rating. No performance.',
            cadence: 'once',
            minutes: 10,
          },
        ],
        prompts: [
          'Where is the gap widest in my life right now — prayer, time, desire, or attention?',
          'What have I been calling “trying” that was really only intending?',
        ],
      }),
      lesson({
        id: 'l2',
        slug: 'who-is-a-mujahid',
        order: 2,
        moduleId: 'awakening',
        title: 'Who Is a Mujāhid?',
        subtitle: 'The fight is inward first',
        minutes: 6,
        bigIdea:
          'Mujāhada is sustained struggle against your own lower self. Done for Allah, it is worship — and it is the root of every outer victory.',
        blocks: [
          {
            kind: 'p',
            text: 'The word mujāhid comes from jihād: exertion, struggle, effort. Before it is ever a word about armies, it is a word about a man and his own nafs at two in the morning with a phone in his hand.',
          },
          { kind: 'h', text: 'Three fronts, one battlefield' },
          {
            kind: 'list',
            items: [
              'The nafs — your appetites, fears, and endless appetite for comfort.',
              'Shayṭān — the whisper that makes the wrong thing feel reasonable.',
              'Dunyā — a world engineered to keep you busy, flattered, and distracted.',
            ],
          },
          {
            kind: 'p',
            text: 'You will not win an outer war while losing an inner one. Discipline is not the opposite of worship; it is the shape worship takes on an ordinary Tuesday.',
          },
          {
            kind: 'quote',
            text: 'Actions are but by intentions, and every person shall have only that which he intended.',
            source: 'Bukhārī & Muslim',
          },
          {
            kind: 'p',
            text: 'This is why niyyah is not a formality. It is what converts a gym session, a study block, an early night, or a difficult conversation into an act of worship. The act stays small. The intention makes it vast.',
          },
          {
            kind: 'ayah',
            arabic: 'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا',
            translation: 'And those who strive for Us — We will surely guide them to Our ways.',
            source: 'Qur’an 29:69',
          },
          { kind: 'h', text: 'Not perfectionism' },
          {
            kind: 'p',
            text: 'A mujāhid falls. The difference is that he returns quickly, without theatre. He does not turn one slip into a lost week, and he does not turn discipline into a personality performance for other people.',
          },
          {
            kind: 'quote',
            text: 'The most beloved deeds to Allah are those done consistently, even if they are small.',
            source: 'Bukhārī & Muslim',
          },
          {
            kind: 'p',
            text: 'Small, consistent, sincere, and yours. That is the standard. Not impressive. Sustainable.',
          },
        ],
        drills: [
          {
            id: 'l2-niyyah',
            title: 'Rewrite three intentions',
            instruction:
              'Take three ordinary acts — work or study, eating, and sleep — and write the intention that turns each into worship. Keep them on your phone lock screen or above your desk.',
            cadence: 'once',
            minutes: 10,
          },
          {
            id: 'l2-return',
            title: 'Write your return protocol',
            instruction:
              'Write the exact three steps you will take within one hour of slipping: acknowledge without drama, make wudu or pray two rakʿah, do the next small right action.',
            cadence: 'once',
            minutes: 8,
          },
        ],
        prompts: [
          'Which front — nafs, shayṭān, or dunyā — has been winning most of my losses?',
          'Whose approval am I actually chasing when I say I want discipline?',
        ],
      }),
      lesson({
        id: 'l3',
        slug: 'the-contract',
        order: 3,
        moduleId: 'awakening',
        title: 'The 60-Day Contract',
        subtitle: 'Define the win before the war',
        minutes: 7,
        bigIdea:
          'A contract turns intention into a standard you can measure — and standards, not feelings, are what make change visible.',
        blocks: [
          {
            kind: 'p',
            text: 'Most people begin with a mood. You will begin with a contract. Not because a document is magic, but because vagueness is where discipline goes to die.',
          },
          { kind: 'h', text: 'Rules of engagement' },
          {
            kind: 'list',
            items: [
              'Never miss twice. One missed day is information; two is a new identity.',
              'The minimum viable day still counts. On the worst day, keep the floor.',
              'Log honestly. A flattering log is a broken mirror.',
              'Change one thing per week. Not five.',
              'Rest is part of the program, not a failure of it.',
            ],
          },
          { kind: 'h', text: 'Define the win in behaviour' },
          {
            kind: 'p',
            text: '“Get closer to Allah” is beautiful and unmeasurable. “Pray all five in the masjid or on time, read one page of Quran daily, and finish the weekly deliverable” is a win you can verify on a Tuesday when you feel nothing.',
          },
          {
            kind: 'p',
            text: 'The outcome — a calmer heart, a stronger body, a launched project — follows the behaviour. Do not chase the outcome directly. Build the day that produces it.',
          },
          { kind: 'h', text: 'How the 60 days run' },
          {
            kind: 'list',
            items: [
              'Eight modules, twenty-three lessons, one at a time.',
              'Five daily commitments that never change: salah, Quran, dhikr, deep work, and guarding your attention.',
              'Three milestones — days 21, 42, and 60 — where you stop, review, and consolidate.',
              'One weekly review. One change. No cramming.',
            ],
          },
          {
            kind: 'drill',
            text: 'The contract is only real when it is specific, written, and witnessed. Fill it in below, then say it out loud once.',
          },
        ],
        drills: [
          {
            id: 'l3-contract',
            title: 'Sign the contract',
            instruction:
              'Write your niyyah, your definition of a winning day, one boundary you will not cross, and the name of one person who may ask you about it.',
            cadence: 'once',
            minutes: 12,
          },
          {
            id: 'l3-floor',
            title: 'Define the floor',
            instruction:
              'Write the smallest version of a day that still counts: which prayers, how many Quran pages, which one action. This is your sick-day, travel-day, terrible-day standard.',
            cadence: 'once',
            minutes: 6,
          },
        ],
        prompts: [
          'What would make me quietly proud after 60 days — not impressed, proud?',
          'Who will I allow to ask me the uncomfortable question?',
        ],
      }),
    ],
  },
  {
    id: 'time',
    slug: 'time',
    order: 2,
    title: 'Time as Sacred Trust',
    arabic: 'الأمانة',
    subtitle: 'Treating your hours like the amanah they are',
    thesis:
      'Time is the one currency you cannot earn back. The prayers are not interruptions to your day — they are the architecture of it.',
    lessons: [
      lesson({
        id: 'l4',
        slug: 'the-amanah-of-hours',
        order: 4,
        moduleId: 'time',
        title: 'The Amanah of Hours',
        subtitle: 'Time is a trust, not a resource',
        minutes: 6,
        bigIdea:
          'You do not own your time; you are entrusted with it. That single shift changes how you plan, rest, and say no.',
        blocks: [
          {
            kind: 'quote',
            text: 'There are two blessings which many people lose: health and free time.',
            source: 'Bukhārī',
          },
          {
            kind: 'p',
            text: 'You have been given a number of hours that you did not choose and cannot extend. What you do with them is the test. Not how busy you looked. What you actually built, who you became, and whether it was for Allah.',
          },
          {
            kind: 'ayah',
            translation:
              'By time, indeed mankind is in loss — except those who believe and do righteous deeds and advise one another to truth and patience.',
            source: 'Qur’an 103:1–3',
          },
          { kind: 'h', text: 'The prayer skeleton' },
          {
            kind: 'p',
            text: 'Most productivity systems ask you to squeeze worship around work. The believing day is built the other way around: Fajr opens it, Dhuhr breaks it at its peak, Asr re-centres it, Maghrib closes the workday, and Isha seals it. Five anchors, set by your Lord, not by your inbox.',
          },
          {
            kind: 'p',
            text: 'Once the prayers are fixed, the day stops being formless. You are no longer deciding when the day begins; you are deciding what fills the space between the anchors.',
          },
          { kind: 'h', text: 'Where time actually leaks' },
          {
            kind: 'list',
            items: [
              'The unplanned first hour — the day is decided before you are awake.',
              'The phone in the bedroom — the night and the morning both belong to someone else.',
              'No shutdown — work bleeds into rest until both are shallow.',
              'Saying yes by default — other people plan your week, then you call it “busy”.',
              'Context switching — ten open tabs is not ten times the output.',
            ],
          },
          {
            kind: 'p',
            text: 'You cannot add hours. You can remove leaks. That is the entire game.',
          },
        ],
        drills: [
          {
            id: 'l4-audit',
            title: 'Three-day time audit',
            instruction:
              'For the next three days, note what you actually did in 30-minute blocks — no editing. At the end, mark the three biggest leaks. Do not fix them yet. Just see them.',
            cadence: 'daily',
            minutes: 5,
          },
          {
            id: 'l4-anchor',
            title: 'Anchor the five',
            instruction:
              'Set five recurring prayer alarms with 10 minutes of buffer before each adhan. Put the phone outside the bedroom tonight.',
            cadence: 'once',
            minutes: 8,
          },
        ],
        prompts: [
          'If my hours were a trust I must return, what would I stop spending them on this week?',
          'Which prayer most often gets treated as an interruption?',
        ],
      }),
      lesson({
        id: 'l5',
        slug: 'five-pillars-of-the-day',
        order: 5,
        moduleId: 'time',
        title: 'The Five Pillars of Your Day',
        subtitle: 'A day structure that survives real life',
        minutes: 7,
        bigIdea:
          'A disciplined day has an anchor, three blocks, a buffer, and a shutdown. Everything else is decoration.',
        blocks: [
          {
            kind: 'p',
            text: 'A day that works is not a colour-coded fantasy. It is a small number of decisions made once, then protected. Here is the structure this program runs on.',
          },
          { kind: 'h', text: '1. The Fajr anchor' },
          {
            kind: 'p',
            text: 'The first hour after Fajr is the most valuable hour you own: quiet, unclaimed, and before the world wakes. Do not give it to the phone. Give it to Quran, dhikr, and one important thing.',
          },
          { kind: 'h', text: '2. Three blocks' },
          {
            kind: 'list',
            items: [
              'Deep block — the work only you can do, 60–90 minutes, phone in another room.',
              'Service block — family, community, or the people you are responsible for.',
              'Recovery block — movement, food, rest, and something that refills you without numbing you.',
            ],
          },
          { kind: 'h', text: '3. The buffer' },
          {
            kind: 'p',
            text: 'A day with no buffer is a day that breaks on contact. Put twenty minutes between blocks. The buffer is not laziness; it is what lets you keep the plan when a conversation runs long or a child needs you.',
          },
          { kind: 'h', text: '4. The shutdown' },
          {
            kind: 'p',
            text: 'Decide when work ends before it starts. Shutdown means: capture what is open, choose tomorrow’s three priorities, and say out loud that today is finished. Without a shutdown, work becomes a fog you never leave.',
          },
          {
            kind: 'drill',
            text: 'Build tomorrow on paper before you sleep. If it does not fit in three priorities and three blocks, it does not fit in the day.',
          },
        ],
        drills: [
          {
            id: 'l5-template',
            title: 'Build your day template',
            instruction:
              'Write your default weekday: Fajr anchor, deep block, service block, recovery block, shutdown time. Make it boring enough to repeat.',
            cadence: 'once',
            minutes: 12,
          },
          {
            id: 'l5-shutdown',
            title: 'Run a shutdown',
            instruction:
              'At your chosen time, close every open loop in one place, pick tomorrow’s three priorities, and stop. No “one more thing”.',
            cadence: 'daily',
            minutes: 8,
          },
        ],
        prompts: [
          'Which block is missing from my current day — deep, service, or recovery?',
          'What time does my workday actually end, and who decided that?',
        ],
      }),
      lesson({
        id: 'l6',
        slug: 'the-barakah-planner',
        order: 6,
        moduleId: 'time',
        title: 'The Barakah Planner',
        subtitle: 'Plan with intention, not optimism',
        minutes: 6,
        bigIdea:
          'Planning is not predicting the future; it is deciding, in advance, what deserves your finite attention — and asking Allah for barakah in it.',
        blocks: [
          {
            kind: 'p',
            text: 'Most plans fail because they are wishes with times next to them. A barakah plan is different: it is small, intentional, and made the night before, when you are calm enough to be honest.',
          },
          { kind: 'h', text: 'The nightly five minutes' },
          {
            kind: 'list',
            items: [
              'Name tomorrow’s three priorities — one deen, one duty, one build.',
              'Give each priority a block, not just a slot on a list.',
              'Attach a niyyah to each block: who is this for, and why does it matter?',
              'Leave a gap. The unplanned space is where mercy and emergencies arrive.',
              'Close with a short duʿāʾ for barakah, not merely for productivity.',
            ],
          },
          {
            kind: 'p',
            text: 'Barakah is not doing more in the same hours. It is Allah placing benefit in what you do. It is often the difference between a day that looked full and a day that actually moved something.',
          },
          { kind: 'h', text: 'Protect the plan from fantasy' },
          {
            kind: 'p',
            text: 'If you consistently plan eight hours of deep work and complete two, the plan is not ambitious — it is fiction. Plan for the week you actually live, then raise the floor slowly.',
          },
          {
            kind: 'quote',
            text: 'The strong believer is better and more beloved to Allah than the weak believer, while there is good in both. Seek that which benefits you, seek help from Allah, and do not give up.',
            source: 'Muslim',
          },
          {
            kind: 'p',
            text: 'Three real priorities beat ten imaginary ones. Every time.',
          },
        ],
        drills: [
          {
            id: 'l6-plan',
            title: 'Plan tonight',
            instruction:
              'Open the planner and set tomorrow’s three priorities, each with a time block, a niyyah, and a realistic duration. Do it before Isha.',
            cadence: 'daily',
            minutes: 5,
          },
          {
            id: 'l6-top3',
            title: 'Trim to three',
            instruction:
              'Take your current to-do list and delete or defer everything except the three things that would make tomorrow meaningful.',
            cadence: 'once',
            minutes: 7,
          },
        ],
        prompts: [
          'Which of my “priorities” is actually someone else’s priority for me?',
          'Where in tomorrow is the gap that protects the plan?',
        ],
      }),
    ],
  },
  {
    id: 'soul',
    slug: 'disciplined-soul',
    order: 3,
    title: 'The Disciplined Soul',
    arabic: 'النفس',
    subtitle: 'Systems, not motivation',
    thesis:
      'Discipline is not a personality type. It is a set of defaults that hold you up when your feelings are not cooperating.',
    lessons: [
      lesson({
        id: 'l7',
        slug: 'motivation-is-a-guest',
        order: 7,
        moduleId: 'soul',
        title: 'Motivation Is a Guest',
        subtitle: 'Build for the days you feel nothing',
        minutes: 6,
        bigIdea:
          'Motivation visits; systems stay. Design your life so the right action is the default, not the decision.',
        blocks: [
          {
            kind: 'p',
            text: 'Motivation is a guest. It arrives unannounced, stays for a video or two, and leaves before the hard part. If your plan depends on it, your plan depends on a stranger.',
          },
          { kind: 'h', text: 'The loop underneath the habit' },
          {
            kind: 'list',
            items: [
              'Cue — what starts the behaviour. Usually a place, a time, or a feeling.',
              'Routine — the behaviour itself.',
              'Reward — what you get from it, including the relief of not doing the hard thing.',
            ],
          },
          {
            kind: 'p',
            text: 'You do not break a loop with willpower. You break it by changing the cue or the friction. Put the phone in another room and the loop loses its trigger. Put the mushaf on your pillow and the loop finds a new one.',
          },
          { kind: 'h', text: 'Identity votes' },
          {
            kind: 'p',
            text: 'Every action is a vote for the kind of person you are becoming. One page of Quran is a vote. One honest log entry is a vote. One night without the scroll is a vote. You do not need a landslide today. You need the vote.',
          },
          {
            kind: 'quote',
            text: 'The most beloved deeds to Allah are those done consistently, even if they are small.',
            source: 'Bukhārī & Muslim',
          },
          {
            kind: 'p',
            text: 'Small is not the compromise. Small is the strategy. What is consistent becomes identity, and identity eventually makes the hard thing feel normal.',
          },
        ],
        drills: [
          {
            id: 'l7-loop',
            title: 'Map one loop',
            instruction:
              'Pick your worst daily habit. Write its cue, routine, and reward. Then change one cue today — move the object, change the room, set a different trigger.',
            cadence: 'once',
            minutes: 9,
          },
          {
            id: 'l7-vote',
            title: 'Cast one vote',
            instruction:
              'Choose the smallest version of your most important habit and do it before you sleep. Log it. Not for the streak — as evidence.',
            cadence: 'daily',
            minutes: 5,
          },
        ],
        prompts: [
          'Which habit am I still trying to fix with motivation alone?',
          'What would my day look like if it were designed by my values instead of my moods?',
        ],
      }),
      lesson({
        id: 'l8',
        slug: 'design-the-default',
        order: 8,
        moduleId: 'soul',
        title: 'Design the Default',
        subtitle: 'Make the right thing the easy thing',
        minutes: 6,
        bigIdea:
          'Willpower is a limited resource; environment is not. Change the room, the phone, the shelf, the route — and the behaviour follows.',
        blocks: [
          {
            kind: 'p',
            text: 'You are not weak for choosing what is in front of you. You are human. The mistake is leaving the wrong thing in front of you and calling the consequence a character problem.',
          },
          { kind: 'h', text: 'The 20-second rule' },
          {
            kind: 'p',
            text: 'Make the good behaviour twenty seconds easier and the bad behaviour twenty seconds harder. The gap is small, but it is where decisions are actually made.',
          },
          {
            kind: 'list',
            items: [
              'Mushaf on the desk, phone charging in the hallway.',
              'Weights by the bed; the scrolling app logged out and two taps deep.',
              'Water on the desk; the sweets out of the house, not in a “hidden” drawer.',
              'Work documents open the night before; the browser with eight tabs closed.',
            ],
          },
          { kind: 'h', text: 'Design the evening the night before' },
          {
            kind: 'p',
            text: 'The morning is decided the night before. Clothes, Quran, water, and the first task laid out. The fewer decisions before Fajr, the fewer chances for the old self to vote.',
          },
          { kind: 'h', text: 'Guard the borders' },
          {
            kind: 'p',
            text: 'Some things are not habits to manage; they are borders to keep. The phone in the bedroom. The late-night YouTube tab. The private window. Do not negotiate with these at 11pm. Decide now, while you are clear.',
          },
          {
            kind: 'ayah',
            arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
            translation: 'Allah does not burden a soul beyond what it can bear.',
            source: 'Qur’an 2:286',
          },
          {
            kind: 'p',
            text: 'The environment is not an excuse. It is the part of the struggle you can win before the struggle begins.',
          },
        ],
        drills: [
          {
            id: 'l8-friction',
            title: 'Remove three frictions',
            instruction:
              'Make three good actions easier and three bad ones harder, physically, right now. Move objects. Log out. Unplug. Then write down what you changed.',
            cadence: 'once',
            minutes: 10,
          },
          {
            id: 'l8-evening',
            title: 'Set the night before',
            instruction:
              'Before bed: clothes out, Quran open, phone charging outside the room, first task visible. Do it for seven nights.',
            cadence: 'daily',
            minutes: 5,
          },
        ],
        prompts: [
          'What is in my room right now that votes against my goals?',
          'Which boundary have I been renegotiating every night?',
        ],
      }),
      lesson({
        id: 'l9',
        slug: 'minimum-viable-day',
        order: 9,
        moduleId: 'soul',
        title: 'The Minimum Viable Day',
        subtitle: 'Never let a bad day become a lost week',
        minutes: 5,
        bigIdea:
          'On the hardest days, the goal is not excellence. It is continuity. A floor you can always keep is the strongest part of the system.',
        blocks: [
          {
            kind: 'p',
            text: 'There will be days with fever, deadlines, travel, grief, and no sleep. If your standard only works on good days, it is not a standard. It is a mood with a checklist.',
          },
          { kind: 'h', text: 'The floor' },
          {
            kind: 'list',
            items: [
              'Five prayers — even shortened, even at home, even late.',
              'One page of Quran — or one page read slowly.',
              'One honest log entry — the day happened; tell the truth.',
              'One action toward the thing that matters — five minutes counts.',
            ],
          },
          {
            kind: 'p',
            text: 'This is not lowering the bar. It is protecting the identity. A minimum day says: I am still the person who does this, even today.',
          },
          { kind: 'h', text: 'The 20% rule' },
          {
            kind: 'p',
            text: 'When life compresses the day, do twenty percent — not zero. Two minutes of dhikr, one page, one set, one message. Zero is not rest; zero is erosion.',
          },
          {
            kind: 'p',
            text: 'And when the crisis passes, return on the next day, not next Monday. There is no ceremonial restart. You simply keep going from where you are.',
          },
          {
            kind: 'quote',
            text: 'Take up good deeds only as much as you are able, for the best deeds are those done regularly even if they are few.',
            source: 'Ibn Mājah, graded ṣaḥīḥ',
          },
        ],
        drills: [
          {
            id: 'l9-floor',
            title: 'Write your floor',
            instruction:
              'Define your minimum viable day in numbers. Keep it so small that you could do it with a fever and a flight. Save it where you will see it.',
            cadence: 'once',
            minutes: 6,
          },
          {
            id: 'l9-return',
            title: 'Rehearse the return',
            instruction:
              'Write the sentence you will say to yourself after a missed day — something true, brief, and free of both excuses and self-hatred.',
            cadence: 'once',
            minutes: 5,
          },
        ],
        prompts: [
          'What is my real floor — not the ideal I perform on good days?',
          'What do I usually do after a miss: return, or negotiate a new start date?',
        ],
      }),
    ],
  },
  {
    id: 'nafs',
    slug: 'conquering-the-nafs',
    order: 4,
    title: 'Conquering the Nafs',
    arabic: 'مجاهدة النفس',
    subtitle: 'Acting on values, not feelings',
    thesis:
      'You do not defeat the nafs with one heroic decision. You defeat it with a pause, repeated until it becomes character.',
    lessons: [
      lesson({
        id: 'l10',
        slug: 'know-your-nafs',
        order: 10,
        moduleId: 'nafs',
        title: 'Know Your Nafs',
        subtitle: 'Observation before control',
        minutes: 7,
        bigIdea:
          'The nafs is not you — it is a force inside you. You cannot govern what you cannot observe without flinching.',
        blocks: [
          {
            kind: 'p',
            text: 'The Quran names the inner self in stages, and the names are a map.',
          },
          {
            kind: 'list',
            items: [
              'An-nafs al-ammāra — the self that commands to evil, the impulsive appetite that says now.',
              'An-nafs al-lawwāma — the self that blames itself, the conscience that keeps turning the light on.',
              'An-nafs al-muṭmaʾinna — the self at rest, settled in obedience, no longer at war with what is right.',
            ],
          },
          {
            kind: 'ayah',
            arabic: 'وَمَا أُبَرِّئُ نَفْسِي ۚ إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوءِ إِلَّا مَا رَحِمَ رَبِّي',
            translation:
              'And I do not acquit myself. Indeed, the soul is a persistent enjoiner of evil, except those upon whom my Lord has mercy.',
            source: 'Qur’an 12:53',
          },
          {
            kind: 'ayah',
            translation:
              'And I swear by the reproaching soul — a conscience that blames and corrects.',
            source: 'Qur’an 75:2',
          },
          {
            kind: 'ayah',
            translation: 'O reassured soul, return to your Lord, well pleased and well pleasing.',
            source: 'Qur’an 89:27–28',
          },
          { kind: 'h', text: 'Observation, not war' },
          {
            kind: 'p',
            text: 'You cannot defeat an urge by hating yourself for having it. That just adds shame to the fire. The first skill is observation: notice the thought, name it, and watch it move through you. “This is fatigue. This is loneliness. This is the 11pm pattern.”',
          },
          {
            kind: 'p',
            text: 'You are not your urge. You are the one who can see it, name it, and choose what happens next. That witness is the part of you that grows.',
          },
          { kind: 'h', text: 'Start a trigger log' },
          {
            kind: 'p',
            text: 'For one week, log every strong urge: time, place, feeling, and what you did. Do not try to fix it yet. Patterns you cannot see will keep defeating you.',
          },
        ],
        drills: [
          {
            id: 'l10-log',
            title: 'Log three urges',
            instruction:
              'Use the Lust Mastery toolkit to log three urges today: what happened before it, what you felt, what you did, and what you learned.',
            cadence: 'daily',
            minutes: 6,
          },
          {
            id: 'l10-pattern',
            title: 'Name your pattern',
            instruction:
              'After three days of logging, write the one pattern you see most clearly — time, emotion, place, or device.',
            cadence: 'once',
            minutes: 8,
          },
        ],
        prompts: [
          'Which of the three nafs states describes most of my week?',
          'What feeling is usually underneath the urge I keep chasing?',
        ],
      }),
      lesson({
        id: 'l11',
        slug: 'the-pause-protocol',
        order: 11,
        moduleId: 'nafs',
        title: 'The Pause Protocol',
        subtitle: 'Ninety seconds between urge and action',
        minutes: 6,
        bigIdea:
          'The urge is a wave, not a command. Insert a repeatable pause and the wave breaks before it takes you.',
        blocks: [
          {
            kind: 'p',
            text: 'Most failures last less time than it takes to boil water. The gap between the impulse and the action is usually seconds. That is good news: you do not need a stronger will for the rest of your life. You need a reliable pause for ninety seconds.',
          },
          { kind: 'h', text: 'The protocol' },
          {
            kind: 'list',
            items: [
              'Stop moving. Do not open, click, or reach.',
              'Breathe in for four, out for six, five times.',
              'Name it: “This is an urge, not an instruction.”',
              'Change state: stand up, make wudu, step outside, drink water.',
              'Delay ten minutes. The urge rarely survives a deliberate ten minutes.',
              'Open the return log and write the choice you made.',
            ],
          },
          {
            kind: 'p',
            text: 'You are not suppressing the feeling. You are letting it rise and fall without obeying it. Every time it falls, the habit weakens and the witness strengthens.',
          },
          { kind: 'h', text: 'Use the body' },
          {
            kind: 'p',
            text: 'Wudu, cold water, movement, and dhikr are not distractions. They are state changes. The urge lives in a particular body at a particular moment. Change the body and the moment loses its grip.',
          },
          {
            kind: 'quote',
            text: 'The strong man is not the one who wrestles well, but the one who controls himself when he is angry.',
            source: 'Bukhārī & Muslim',
          },
          { kind: 'h', text: 'Rehearse before you need it' },
          {
            kind: 'p',
            text: 'Read this protocol twice today and once tonight. Under pressure, you will not rise to your intentions; you will fall to your rehearsal.',
          },
        ],
        drills: [
          {
            id: 'l11-rehearse',
            title: 'Rehearse the pause',
            instruction:
              'Run the six steps once in a low-stakes moment today. Say the line out loud: “This is an urge, not an instruction.”',
            cadence: 'daily',
            minutes: 5,
          },
          {
            id: 'l11-plan',
            title: 'Pre-decide three moments',
            instruction:
              'Identify the three times today you are most likely to break your standard, and write what you will do instead before you get there.',
            cadence: 'once',
            minutes: 8,
          },
        ],
        prompts: [
          'What does my face feel like right before I give in?',
          'Which change of state works fastest for me — wudu, movement, or leaving the room?',
        ],
      }),
      lesson({
        id: 'l12',
        slug: 'anger-envy-comparison',
        order: 12,
        moduleId: 'nafs',
        title: 'Anger, Envy, and Comparison',
        subtitle: 'The leaks that look spiritual',
        minutes: 6,
        bigIdea:
          'Some of the most costly leaks are not obvious sins — they are the inner habits that drain your peace and make everyone else your rival.',
        blocks: [
          {
            kind: 'p',
            text: 'You can pray five times, fast Mondays, and still live in a low-grade fog of resentment. The inner life is not fixed by the outer checklist alone.',
          },
          { kind: 'h', text: 'Anger' },
          {
            kind: 'p',
            text: 'Anger is energy. It is not always wrong — but unmanaged, it becomes a leak that costs you your family, your reputation, and your clarity. The pause works here too. Delay the reply. Leave the room. Make wudu.',
          },
          { kind: 'h', text: 'Envy' },
          {
            kind: 'p',
            text: 'Envy is reading someone else’s blessing and feeling that it diminishes yours. It is a quiet denial of Allah’s distribution. The antidote is not pretending you do not notice. It is to notice, thank Allah for what He gave them, and ask Him for what you need without comparing the portions.',
          },
          { kind: 'h', text: 'Comparison' },
          {
            kind: 'p',
            text: 'You cannot compete with someone whose full life you cannot see. Social media gives you the highlight and hides the cost. Every comparison you make is against an edited sample.',
          },
          {
            kind: 'ayah',
            translation:
              'And do not wish for that by which Allah has made some of you exceed others. For men is a share of what they have earned, and for women is a share of what they have earned. And ask Allah of His bounty.',
            source: 'Qur’an 4:32',
          },
          { kind: 'h', text: 'The discipline of the tongue and the thumb' },
          {
            kind: 'p',
            text: 'Most inner leaks now have an outer exit: a subtweet, a comment, a silent judgment. Before you send, ask: is this true, is it useful, is it kind, and is it mine to say? If not, close the app.',
          },
          {
            kind: 'quote',
            text: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.',
            source: 'Bukhārī & Muslim',
          },
        ],
        drills: [
          {
            id: 'l12-anger',
            title: 'Build an anger protocol',
            instruction:
              'Write the exact steps you will take the next time anger rises: delay, wudu, leave, respond after Isha — whatever fits. Make it specific.',
            cadence: 'once',
            minutes: 8,
          },
          {
            id: 'l12-gratitude',
            title: 'Ten blessings, named',
            instruction:
              'Write ten specific blessings you did not earn. Then make duʿāʾ for someone you have envied this week.',
            cadence: 'daily',
            minutes: 6,
          },
        ],
        prompts: [
          'Who have I been comparing myself to, and what am I pretending not to see about their life?',
          'What unspoken sentence have I been carrying that is making me bitter?',
        ],
      }),
      lesson({
        id: 'l13',
        slug: 'accountability-that-works',
        order: 13,
        moduleId: 'nafs',
        title: 'Accountability That Works',
        subtitle: 'A witness, not a judge',
        minutes: 6,
        bigIdea:
          'Change accelerates when someone honest can ask you a specific question — not when someone shames you in general.',
        blocks: [
          {
            kind: 'p',
            text: 'Private resolve is fragile. Not because you are weak, but because you are unseen. Accountability is the practice of letting one trustworthy person see the truth with you.',
          },
          { kind: 'h', text: 'Choose the right witness' },
          {
            kind: 'list',
            items: [
              'Trustworthy with what you say, not just sympathetic.',
              'Willing to ask the uncomfortable question without humiliating you.',
              'Consistent enough to actually check weekly.',
              'Not someone you need to impress.',
            ],
          },
          { kind: 'h', text: 'Make the report specific' },
          {
            kind: 'p',
            text: '“How is it going?” gets a vague answer. “Did you pray Fajr on time every day this week? How many pages did you read? Did you keep the no-phone-in-bed rule?” gets a real one.',
          },
          {
            kind: 'p',
            text: 'The weekly review in this app exists to be shown, not just completed. A number you would not want anyone to see is the number that needs attention.',
          },
          { kind: 'h', text: 'Accountability without shame' },
          {
            kind: 'p',
            text: 'A witness is not a prosecutor. The goal is repair, not conviction. If you miss, report it plainly, name the cause, and choose one adjustment. Then continue.',
          },
          {
            kind: 'quote',
            text: 'A believer is the mirror of his brother. If he sees a defect in him, he corrects him.',
            source: 'Abū Dāwūd, graded ḥasan',
          },
          {
            kind: 'p',
            text: 'You need one person. Not a following. One person who will tell you the truth and still make duʿāʾ for you.',
          },
        ],
        drills: [
          {
            id: 'l13-witness',
            title: 'Name your witness',
            instruction:
              'Write the name of one person you will message this week, the day you will check in, and the three questions they may ask you.',
            cadence: 'once',
            minutes: 7,
          },
          {
            id: 'l13-message',
            title: 'Send the message',
            instruction:
              'Actually send it today: “I am working on a 60-day reset. Can I send you a short weekly report and can you ask me if I skip it?”',
            cadence: 'once',
            minutes: 5,
          },
        ],
        prompts: [
          'Who already has permission to tell me the truth?',
          'What am I hiding that would lose its power if said out loud to a trustworthy person?',
        ],
      }),
    ],
  },
  {
    id: 'lust',
    slug: 'lust-mastery',
    order: 5,
    title: 'Lust Mastery',
    arabic: 'ضبط الشهوة',
    subtitle: 'Channel the drive, do not be ruled by it',
    thesis:
      'Desire is not the enemy. Slavery to it is. The strongest man redirects a powerful force toward what Allah made it for.',
    lessons: [
      lesson({
        id: 'l14',
        slug: 'the-strongest-man',
        order: 14,
        moduleId: 'lust',
        title: 'The Strongest Man',
        subtitle: 'Desire, redirected',
        minutes: 7,
        bigIdea:
          'You will not delete the drive. You will govern it, aim it, and stop letting it make your decisions.',
        blocks: [
          {
            kind: 'p',
            text: 'This module treats you like an adult. It will not pretend the struggle is simple, and it will not use shame as a tool. It will give you a plan.',
          },
          {
            kind: 'quote',
            text: 'Whoever can guarantee for me what is between his jaws and what is between his legs, I will guarantee him Paradise.',
            source: 'Bukhārī',
          },
          {
            kind: 'p',
            text: 'The hadith is not a threat. It is a map of where most of a man’s testing lives: the tongue and the desire. Master those two and the rest of the self becomes governable.',
          },
          { kind: 'h', text: 'Desire is energy' },
          {
            kind: 'p',
            text: 'The drive is not dirty. It is the same force that builds families, careers, and civilizations when it is aimed. The problem is not that you have it; it is that you have been letting it drive without a license.',
          },
          {
            kind: 'p',
            text: 'The Islamic answer is not suppression for its own sake. It is halal channel — marriage when able, fasting when not, and a life large enough that appetite is not the main event.',
          },
          {
            kind: 'quote',
            text: 'O young men, whoever among you can afford to get married, let him do so, for it is more lowering of the gaze and more protecting of the chastity. And whoever cannot, then let him fast, for it will be a restraint for him.',
            source: 'Bukhārī & Muslim',
          },
          { kind: 'h', text: 'Aim the energy' },
          {
            kind: 'p',
            text: 'An unfocused man has more room for the urge. A man with a mission, a training plan, a service commitment, and a hard problem to solve has less. This is not a trick; it is stewardship of the same energy.',
          },
          {
            kind: 'p',
            text: 'Build a life that is worth more than the urge. Not because the urge disappears, but because it stops being the loudest thing in the room.',
          },
        ],
        drills: [
          {
            id: 'l14-aim',
            title: 'Name the channel',
            instruction:
              'Write the highest use of your energy right now: the person you are becoming, the family you will lead, the work you are building. Be specific enough to feel it.',
            cadence: 'once',
            minutes: 8,
          },
          {
            id: 'l14-plan',
            title: 'Make a marriage or fasting plan',
            instruction:
              'If marriage is realistic, write the next concrete step. If not yet, commit to two fasting days this week and put them in your planner. If you have a medical condition, speak to a professional first.',
            cadence: 'once',
            minutes: 7,
          },
        ],
        prompts: [
          'What is the urge actually asking for — intimacy, relief, reward, escape, or rest?',
          'What would change if I treated this energy as a resource instead of a shameful secret?',
        ],
      }),
      lesson({
        id: 'l15',
        slug: 'guard-the-gates',
        order: 15,
        moduleId: 'lust',
        title: 'Guard the Gates',
        subtitle: 'Win at the door, not in the room',
        minutes: 7,
        bigIdea:
          'You do not defeat temptation at the moment of temptation. You defeat it at the door — the gaze, the device, the hour, and the room.',
        blocks: [
          {
            kind: 'ayah',
            arabic: 'قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ',
            translation: 'Tell the believing men to lower their gaze and guard their chastity.',
            source: 'Qur’an 24:30',
          },
          {
            kind: 'p',
            text: 'The command is ordered. First the gaze, then the chastity. That sequence is not accidental. What you allow yourself to look at decides what you will want, and what you want decides what you will do.',
          },
          { kind: 'h', text: 'The four gates' },
          {
            kind: 'list',
            items: [
              'The eye — what you look at, online and in the street. The first gate, and the cheapest to keep.',
              'The device — the private window, the hidden app, the phone beside the bed. The gate most people leave open.',
              'The hour — late night, alone, tired, bored. The gate with the worst guards.',
              'The room — where you go when you want to hide. Change the room and the ritual breaks.',
            ],
          },
          { kind: 'h', text: 'Build the wall before the urge' },
          {
            kind: 'p',
            text: 'Do not decide at midnight. Decide now: phone charges outside the bedroom, no private browser, accountability software if needed, no scrolling in bed, and a book where the phone used to be.',
          },
          {
            kind: 'p',
            text: 'And give the eye something better to rest on. Beauty is not forbidden; it is meant to be seen in the right place. Fix your gaze on what you are building, on the faces of the people you love, on the Qur’an.',
          },
          { kind: 'h', text: 'Idle hands' },
          {
            kind: 'p',
            text: 'The urge grows in unstructured time. This is why the planner matters. An unclaimed evening is an invitation. Fill it with something you would be proud to explain.',
          },
          {
            kind: 'quote',
            text: 'Seven are shaded by Allah on a day when there is no shade but His — among them a man invited by a woman of position and beauty, who says: “I fear Allah.”',
            source: 'Bukhārī & Muslim',
          },
          {
            kind: 'p',
            text: 'The point is not to be busy every second. It is to leave fewer doors open at the hour you know you are weakest.',
          },
        ],
        drills: [
          {
            id: 'l15-walls',
            title: 'Close three gates',
            instruction:
              'Right now: move the phone charging point out of the bedroom, log out of the account you do not want seen, and set a bedtime alarm. Write down what you changed.',
            cadence: 'once',
            minutes: 10,
          },
          {
            id: 'l15-evening',
            title: 'Guard the last hour',
            instruction:
              'For the next seven nights, no screens in bed. Read, make dhikr, or sleep. Log the result tomorrow.',
            cadence: 'daily',
            minutes: 5,
          },
        ],
        prompts: [
          'Which gate do I leave open most often?',
          'What is the honest reason I keep the phone in the bedroom?',
        ],
      }),
      lesson({
        id: 'l16',
        slug: 'the-emergency-protocol',
        order: 16,
        moduleId: 'lust',
        title: 'The Emergency Protocol',
        subtitle: 'What to do in the next ten minutes',
        minutes: 6,
        bigIdea:
          'When the urge is loud, you need a script, not a philosophy. Ten minutes of the right actions breaks most episodes.',
        blocks: [
          {
            kind: 'p',
            text: 'You will not think clearly in the moment. So do not rely on thinking. Rely on a protocol you have already rehearsed.',
          },
          { kind: 'h', text: 'Step 1 — HALT' },
          {
            kind: 'p',
            text: 'Ask: am I Hungry, Angry, Lonely, or Tired? Most urges are one of these wearing a costume. Address the real need first — eat, pray, call someone, sleep.',
          },
          { kind: 'h', text: 'Step 2 — Change the body' },
          {
            kind: 'list',
            items: [
              'Stand up and walk out of the room.',
              'Make wudu with cold water.',
              'Do twenty push-ups or take a fast walk.',
              'Drink a full glass of water.',
            ],
          },
          { kind: 'h', text: 'Step 3 — Change the input' },
          {
            kind: 'p',
            text: 'Do not sit in front of the same screen with the same tab open. Put on a lecture, call your witness, leave the house, go to the masjid. Change what your eyes and ears are receiving.',
          },
          { kind: 'h', text: 'Step 4 — Name the truth' },
          {
            kind: 'p',
            text: 'Say it plainly: “This will cost me more than it gives me.” Then make duʿāʾ. Ask Allah for help in the moment, not only after. The one who asks is not alone.',
          },
          { kind: 'h', text: 'Step 5 — Write the aftermath' },
          {
            kind: 'p',
            text: 'Whether you held or slipped, log it. The log is not a courtroom; it is a map. Every entry makes the next episode more predictable and less powerful.',
          },
          {
            kind: 'drill',
            text: 'Save this protocol somewhere you can reach in five seconds. A widget, a pinned note, a screenshot. Speed matters more than elegance.',
          },
        ],
        drills: [
          {
            id: 'l16-save',
            title: 'Save the protocol',
            instruction:
              'Put the five steps on your home screen, lock screen, or pinned note. If it takes more than five seconds to find, it will not be used.',
            cadence: 'once',
            minutes: 5,
          },
          {
            id: 'l16-run',
            title: 'Run a live drill',
            instruction:
              'The next time a mild urge appears, run the full protocol even if you think you do not need it. Train at low stakes so it works at high stakes.',
            cadence: 'daily',
            minutes: 6,
          },
        ],
        prompts: [
          'Which step of the protocol am I most likely to skip?',
          'Who could I call at 11pm if I needed to? Have I told them?',
        ],
      }),
      lesson({
        id: 'l17',
        slug: 'recovery-without-collapse',
        order: 17,
        moduleId: 'lust',
        title: 'Recovery Without Collapse',
        subtitle: 'A relapse is data, not identity',
        minutes: 7,
        bigIdea:
          'The measure of a man is not that he never falls. It is how quickly and honestly he returns.',
        blocks: [
          {
            kind: 'p',
            text: 'You may slip during these sixty days. If you do, the danger is not the slip. The danger is the story you tell about it: “I already broke it, so the week is gone.”',
          },
          { kind: 'h', text: 'Tawbah is a return, not a performance' },
          {
            kind: 'list',
            items: [
              'Stop. Do not continue the episode to “finish” it.',
              'Admit it to Allah without excuses, and ask forgiveness.',
              'If you harmed someone, make it right where you can.',
              'Do one concrete thing differently in the next hour.',
              'Return to the plan today — not Monday.',
            ],
          },
          {
            kind: 'ayah',
            translation:
              'And whoever fears Allah — He will make for him a way out, and will provide for him from where he does not expect.',
            source: 'Qur’an 65:2–3',
          },
          { kind: 'h', text: 'Break the secrecy' },
          {
            kind: 'p',
            text: 'Compulsion grows in secret. Tell one trustworthy person — your witness, a mentor, an imam, or a professional. Secrecy promises relief and delivers a heavier chain.',
          },
          { kind: 'h', text: 'When it is more than a habit' },
          {
            kind: 'p',
            text: 'If the behaviour feels compulsive, escalates, or keeps damaging your life despite sincere effort, treat it as a health issue and get qualified help. Seeking treatment is not a lack of faith. It is taking the means Allah provided.',
          },
          { kind: 'h', text: 'The return is the point' },
          {
            kind: 'p',
            text: 'A man who slips once in sixty days and returns within the hour is not the same as a man who loses forty days to shame. The system does not demand perfection. It demands the return.',
          },
          {
            kind: 'p',
            text: 'Log the slip. Name the trigger. Adjust one gate. Continue. That is the whole protocol.',
          },
        ],
        drills: [
          {
            id: 'l17-tawbah',
            title: 'Write your tawbah steps',
            instruction:
              'Personalise the five-step return protocol. Keep it short enough to read while ashamed, because that is when you will need it.',
            cadence: 'once',
            minutes: 8,
          },
          {
            id: 'l17-tell',
            title: 'Tell one person',
            instruction:
              'Tell one trustworthy person that you are working on this, without graphic detail. You are breaking secrecy, not performing confession.',
            cadence: 'once',
            minutes: 7,
          },
        ],
        prompts: [
          'What do I usually tell myself after I slip?',
          'What would “returning within the hour” look like for me, concretely?',
        ],
      }),
    ],
  },
  {
    id: 'consistency',
    slug: 'the-consistency-engine',
    order: 6,
    title: 'The Consistency Engine',
    arabic: 'الاستقامة',
    subtitle: 'Never falling off for long again',
    thesis:
      'Consistency is not a personality trait. It is a recovery system — a way of returning fast enough that a slip never becomes a season.',
    lessons: [
      lesson({
        id: 'l18',
        slug: 'never-miss-twice',
        order: 18,
        moduleId: 'consistency',
        title: 'Never Miss Twice',
        subtitle: 'The two-day rule',
        minutes: 5,
        bigIdea:
          'Missing once is an accident. Missing twice is a decision. The rule that protects your identity is simple: never two in a row.',
        blocks: [
          {
            kind: 'p',
            text: 'Every sustainable system has a recovery rule. This one is the most important in the program.',
          },
          {
            kind: 'p',
            text: 'You will miss. You will miss because of illness, travel, a newborn, a deadline, or a bad night. The first miss is not the failure. The second miss is where a habit becomes a memory.',
          },
          { kind: 'h', text: 'The rule' },
          {
            kind: 'list',
            items: [
              'One miss is allowed. It is data.',
              'Two misses in a row triggers the floor day — no exceptions, no negotiation.',
              'The floor day is not the full day. It is the smallest version you defined.',
              'You do not “restart”. You continue with a lower gear.',
            ],
          },
          { kind: 'h', text: 'Why it works' },
          {
            kind: 'p',
            text: 'The two-day rule removes the two most expensive stories: “I already failed, so I might as well continue”, and “I’ll restart on Monday.” Both are ways of turning a moment into a month.',
          },
          { kind: 'h', text: 'Contract with your witness' },
          {
            kind: 'p',
            text: 'Tell your witness the rule. Ask them to check on day two, not to lecture you. The point is not surveillance; it is a hand back into the system.',
          },
          {
            kind: 'quote',
            text: 'The most beloved deeds to Allah are those done consistently, even if they are small.',
            source: 'Bukhārī & Muslim',
          },
          {
            kind: 'p',
            text: 'Consistency is not the absence of interruption. It is the speed of return.',
          },
        ],
        drills: [
          {
            id: 'l18-rule',
            title: 'Write the two-day rule',
            instruction:
              'Write it somewhere visible: “I may miss once. I will never miss twice.” Add the exact action you take on day two.',
            cadence: 'once',
            minutes: 4,
          },
          {
            id: 'l18-check',
            title: 'Check yesterday',
            instruction:
              'If you missed anything yesterday, do the floor version today before noon. If not, help someone else return to theirs.',
            cadence: 'daily',
            minutes: 5,
          },
        ],
        prompts: [
          'Where does “I’ll restart Monday” usually appear in my life?',
          'What makes the second miss so easy for me?',
        ],
      }),
      lesson({
        id: 'l19',
        slug: 'the-weekly-review',
        order: 19,
        moduleId: 'consistency',
        title: 'The Weekly Review',
        subtitle: 'Measure, adjust, recommit',
        minutes: 6,
        bigIdea:
          'A week without review is a week you cannot learn from. Twenty honest minutes can save the next six days.',
        blocks: [
          {
            kind: 'p',
            text: 'The weekly review is where a program becomes yours. It is not a performance report. It is a conversation with your own data, in the presence of Allah.',
          },
          { kind: 'h', text: 'The twenty minutes' },
          {
            kind: 'list',
            items: [
              'Look at the numbers: prayer, Quran, deep work, sleep, screen fast.',
              'Name three wins — including small ones. What actually worked?',
              'Name the biggest leak. Just one.',
              'Choose one change for next week. Only one.',
              'Make duʿāʾ for the week ahead and write your intention.',
            ],
          },
          { kind: 'h', text: 'One change, not five' },
          {
            kind: 'p',
            text: 'The temptation is to fix everything on Sunday and collapse by Wednesday. Choose the one change that would make the largest difference and protect it.',
          },
          { kind: 'h', text: 'Show someone' },
          {
            kind: 'p',
            text: 'A review you would never show your witness is probably softened. Show the score. Say the leak out loud. Let the system be social enough to be honest.',
          },
          {
            kind: 'quote',
            text: 'The wise man is the one who takes account of himself and works for what comes after death.',
            source: 'Tirmidhī, graded ḥasan by some scholars',
          },
          {
            kind: 'p',
            text: 'This is the worldliest part of the program and the most spiritual. Numbers are not the goal. They are the mirror.',
          },
        ],
        drills: [
          {
            id: 'l19-review',
            title: 'Complete the review',
            instruction:
              'Open Progress → Weekly Review. Fill in wins, leaks, and the one change. Set your intent for the week.',
            cadence: 'weekly',
            minutes: 20,
          },
          {
            id: 'l19-send',
            title: 'Send the report',
            instruction:
              'Send your witness three numbers and one sentence: “This is what I’m changing next week.”',
            cadence: 'weekly',
            minutes: 5,
          },
        ],
        prompts: [
          'What is the one number I do not want to look at?',
          'If I changed only one thing next week, which change would make the rest easier?',
        ],
      }),
      lesson({
        id: 'l20',
        slug: 'streaks-seasons',
        order: 20,
        moduleId: 'consistency',
        title: 'Streaks, Seasons, and Sustainability',
        subtitle: 'A system for the life you actually live',
        minutes: 6,
        bigIdea:
          'A streak is a servant, not a master. Build seasons and minimums so the system survives travel, illness, Ramadan, and real life.',
        blocks: [
          {
            kind: 'p',
            text: 'Streaks are useful until they become idols. The moment a broken streak makes you abandon the practice, the metric has replaced the goal.',
          },
          { kind: 'h', text: 'Seasons, not forever' },
          {
            kind: 'p',
            text: 'Ramadan is a season. Exam weeks are a season. New parenthood is a season. A mature system has a normal mode, a compressed mode, and a recovery mode.',
          },
          {
            kind: 'list',
            items: [
              'Normal — full commitments, full blocks.',
              'Compressed — prayers, Quran, and the one thing. Nothing else.',
              'Recovery — sleep, prayer, food, family, and a gentle return.',
            ],
          },
          { kind: 'h', text: 'The anti-fragile minimum' },
          {
            kind: 'p',
            text: 'Decide now what you will keep during travel and illness. Write it on the same card as your floor. When the season changes, you do not need a new identity; you need a different gear.',
          },
          { kind: 'h', text: 'Do not break the chain — or do' },
          {
            kind: 'p',
            text: 'The chain is a tool for motivation. If it stops working, keep the practice and drop the chain. What matters is that the prayer happened, not that the app recorded it. The app is a servant of the deed.',
          },
          {
            kind: 'quote',
            text: 'Take up good deeds only as much as you are able, for the best deeds are those done regularly even if they are few.',
            source: 'Ibn Mājah, graded ṣaḥīḥ',
          },
          {
            kind: 'p',
            text: 'Build for the worst week, not the best one. The best week can take care of itself.',
          },
        ],
        drills: [
          {
            id: 'l20-modes',
            title: 'Write your three modes',
            instruction:
              'Define normal, compressed, and recovery mode in exact behaviours. Keep the whole thing under ten lines.',
            cadence: 'once',
            minutes: 10,
          },
          {
            id: 'l20-season',
            title: 'Name the next season',
            instruction:
              'What is coming in the next 60 days that could disrupt the plan — travel, exams, Ramadan, a move? Write the compressed version now.',
            cadence: 'once',
            minutes: 7,
          },
        ],
        prompts: [
          'What would I keep doing even in my worst week?',
          'Has a broken streak ever made me abandon something I actually valued?',
        ],
      }),
    ],
  },
  {
    id: 'legacy',
    slug: 'legacy-execution',
    order: 7,
    title: 'Legacy Execution',
    arabic: 'الأثر',
    subtitle: 'Scaling discipline into impact',
    thesis:
      'Discipline that ends with you is a hobby. Discipline that serves others becomes a legacy.',
    lessons: [
      lesson({
        id: 'l21',
        slug: 'from-discipline-to-mission',
        order: 21,
        moduleId: 'legacy',
        title: 'From Discipline to Mission',
        subtitle: 'One project that outlives you',
        minutes: 6,
        bigIdea:
          'A disciplined life needs a direction, or it becomes self-improvement on a treadmill. Choose one mission worth the structure.',
        blocks: [
          {
            kind: 'p',
            text: 'You have spent weeks building a container. Now you need something worthy of it. Discipline without mission becomes vanity with a calendar.',
          },
          { kind: 'h', text: 'The test of a mission' },
          {
            kind: 'list',
            items: [
              'It serves people beyond you.',
              'It uses your actual strengths, not a fantasy version of them.',
              'It can be started this week in a small form.',
              'It will still matter in ten years.',
              'It can be done with ikhlas — for Allah, not for applause.',
            ],
          },
          { kind: 'h', text: 'Start with one' },
          {
            kind: 'p',
            text: 'Not a portfolio. Not five side projects. One. The book, the business, the community, the degree, the repair of a relationship, the health that lets you serve. One thing, shipped in public, over a long time.',
          },
          {
            kind: 'ayah',
            translation:
              'Say: My prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds.',
            source: 'Qur’an 6:162',
          },
          {
            kind: 'p',
            text: 'That is the frame that keeps ambition clean. The project is not your identity. It is your service. If it succeeds, Allah gave it. If it fails, you are still His servant.',
          },
          { kind: 'h', text: 'Write the 90-day version' },
          {
            kind: 'p',
            text: 'You have 60 days of this program and roughly 30 more to make a quarter. Define the smallest version of your mission you could complete in 90 days. Then make it weekly.',
          },
        ],
        drills: [
          {
            id: 'l21-mission',
            title: 'Name the one mission',
            instruction:
              'Write one sentence: “I am building ___ for ___ so that ___.” It must serve someone other than you.',
            cadence: 'once',
            minutes: 10,
          },
          {
            id: 'l21-quarter',
            title: 'Define the 90-day version',
            instruction:
              'Break the mission into a 90-day outcome, a 30-day milestone, and this week’s first deliverable.',
            cadence: 'once',
            minutes: 12,
          },
        ],
        prompts: [
          'What would I build if I were not afraid of being seen trying?',
          'Who is worse off because I have not started?',
        ],
      }),
      lesson({
        id: 'l22',
        slug: 'ship-weekly',
        order: 22,
        moduleId: 'legacy',
        title: 'Ship Weekly and the 90-Day Horizon',
        subtitle: 'Output, not intention',
        minutes: 6,
        bigIdea:
          'The world changes through shipped work, not planned work. A weekly deliverable turns a mission into a habit.',
        blocks: [
          {
            kind: 'p',
            text: 'There is a version of you who has read everything, planned everything, and built nothing. The cure is not more planning. It is a weekly deliverable you cannot fake.',
          },
          { kind: 'h', text: 'The weekly ship' },
          {
            kind: 'list',
            items: [
              'One deliverable per week: a chapter, a page, a client conversation, a prototype, a lesson taught.',
              'Define it on Sunday, ship it by Saturday, show it to one person.',
              'Small and real beats large and imagined.',
              'If you miss, ship a smaller version the next day. Never skip the habit.',
            ],
          },
          { kind: 'h', text: 'Deep work is worship when aimed' },
          {
            kind: 'p',
            text: 'One 90-minute block, phone elsewhere, one outcome. That is the engine. Two of those a day will outbuild most people’s entire quarter.',
          },
          { kind: 'h', text: 'After day 60' },
          {
            kind: 'p',
            text: 'On day 61 you do not need a new program. You keep the five commitments, the weekly review, and the mission. The next horizon is 90 days: one outcome, one weekly ship, one witness, one review.',
          },
          {
            kind: 'quote',
            text: 'Allah loves, when one of you does a deed, that he does it with excellence.',
            source: 'Reported in al-Bayhaqī and others; often cited as ḥasan',
          },
          {
            kind: 'p',
            text: 'Excellence is not intensity. It is the same small thing, done well, again.',
          },
        ],
        drills: [
          {
            id: 'l22-ship',
            title: 'Define this week’s ship',
            instruction:
              'Write the one deliverable you will show someone by the end of this week. Put it in the planner as a deep block.',
            cadence: 'weekly',
            minutes: 8,
          },
          {
            id: 'l22-horizon',
            title: 'Write the day-61 plan',
            instruction:
              'What will you keep, drop, and start after the 60 days? Keep the list to three lines.',
            cadence: 'once',
            minutes: 8,
          },
        ],
        prompts: [
          'What have I been “planning” that I could ship in a smaller form this week?',
          'What would I keep doing even if no one ever saw it?',
        ],
      }),
    ],
  },
  {
    id: 'digital',
    slug: 'digital-purity',
    order: 8,
    title: 'Digital Purity',
    arabic: 'طهارة الانتباه',
    subtitle: 'Tech as a tool, not a trap',
    thesis:
      'Attention is the raw material of worship and work. Whatever owns it owns your life.',
    lessons: [
      lesson({
        id: 'l23',
        slug: 'the-tool-and-the-trap',
        order: 23,
        moduleId: 'digital',
        title: 'The Tool and the Trap',
        subtitle: 'Rebuild your relationship with the phone',
        minutes: 7,
        bigIdea:
          'You do not need to hate technology. You need to make it single-purpose, outside your bedroom, and boring by default.',
        blocks: [
          {
            kind: 'p',
            text: 'The phone is the most successful attention extraction machine ever built. It is also a tool that can carry the Qur’an, your work, your family, and a thousand useful things. The difference is architecture.',
          },
          {
            kind: 'ayah',
            translation:
              'And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight, and the heart — all of those will be questioned.',
            source: 'Qur’an 17:36',
          },
          { kind: 'h', text: 'The attention audit' },
          {
            kind: 'p',
            text: 'For one day, write down: screen hours, pickups, the first thing you touch in the morning, the last thing at night, and the three apps that take the most. No judgment. Just the numbers.',
          },
          { kind: 'h', text: 'The architecture' },
          {
            kind: 'list',
            items: [
              'The bedroom is a screen-free zone. Phone charges outside.',
              'No phone for the first 30 minutes after waking and the last 60 before sleep.',
              'Home screen: phone, message, maps, camera. Everything else is buried.',
              'Notifications off by default. You check the app; the app does not check you.',
              'One digital sabbath window each week — a half-day, not necessarily a full day.',
              'If you can, keep a separate device for work and one for the rest.',
            ],
          },
          { kind: 'h', text: 'Replace, do not just remove' },
          {
            kind: 'p',
            text: 'If you remove the scroll and leave a void, the scroll returns. Fill the space deliberately: a book by the bed, a walk after Maghrib, a conversation at the table, a hobby that uses your hands.',
          },
          {
            kind: 'p',
            text: 'The goal is not a monastic life. It is a life where the tool is used and the person is not.',
          },
          {
            kind: 'quote',
            text: 'The smart one is the one who takes account of himself and works for what comes after death, and the weak one is the one who follows his desires and hopes in Allah.',
            source: 'Tirmidhī, graded ḥasan by some scholars',
          },
        ],
        drills: [
          {
            id: 'l23-audit',
            title: 'Run the attention audit',
            instruction:
              'Record screen hours, pickups, first and last use, and the top three apps today. Write the numbers in the Dopamine Reset tool.',
            cadence: 'once',
            minutes: 10,
          },
          {
            id: 'l23-phone',
            title: 'Rebuild the phone',
            instruction:
              'Clear the home screen to four apps, turn off all non-essential notifications, and set a nightly phone curfew. Do it now, not later.',
            cadence: 'once',
            minutes: 12,
          },
        ],
        prompts: [
          'What is the phone actually giving me in the moment I reach for it?',
          'What would I do with the first 30 minutes of the day if it were mine?',
        ],
      }),
    ],
  },
]

export const ALL_LESSONS: Lesson[] = MODULES.flatMap((m) => m.lessons)

export const getLesson = (id: string) => ALL_LESSONS.find((l) => l.id === id)

export const getModule = (id: string) => MODULES.find((m) => m.id === id)