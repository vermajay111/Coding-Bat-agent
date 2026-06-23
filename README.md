# CodingBat Agent

The motivation behind this was that my computer science teacher had set up a competition for completing as many problems as possible in the shortest amount of time.

Now, these CodingBat problems aren't super hard, but they aren't fun to solve either.

What was more fun was creating a bot that solves these problems for me at the speed of light.

Which is why I created this.

First, I created the CLI version.

But then I realized I should host this so that other kids could get their homework done without doing it themselves.

So, I took my CLI app and wrote the backend in Django REST Framework and made a distributed system architecture because, without it, the backend would hang.

Now, the backend can hand off the problem-solving tasks to slave servers, and they will do the work while the backend focuses on taking new requests and providing status updates for the currently solving section.

For the frontend, I made it neat and beautiful. I used shadcn/ui so that it does not look like a website from the 2000s. It looks modern, exactly like a typical SaaS.

*(Foreshadowing?)*
