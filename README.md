# Sifting Fly

Sifting Fly is a quick example of how to include the power of [Sift Ninja's](https://www.siftninja.com) smart content filtering with Flybase.

When a user enters a message, we send it via a custom event to our backend which queries the Sift Ninja API, if no errors are found, it then gets saved to the database and appears on the chat window for all users to see, if a problem was found, then we notify the user who typed that message and let them know it was inappropriate.
