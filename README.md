# nodejs-memory-test

A test program to estimate how much heap memory is available to a Node.js application.

This example code accompanies the book [Data Wrangling with JavaScript](http://bit.ly/2t2cJu2).

There is also a related [blog post](http://www.the-data-wrangler.com/nodejs-memory-limits/) and [video](https://www.youtube.com/watch?v=FvAghuKuak8).

To keep up with my work please follow @ashleydavis75 on Twitter or sign up to the email list on my blog [The Data Wrangler](http://www.the-data-wrangler.com/).

---

<a target="_blank" href="https://www.data-forge-notebook.com/"><img align="right" src="images/support1.png"></a>

If you're a JavaScript developer, you already know that working with data is a big deal. Why let the Python and R coders get all the glory? JavaScript isn't just good at data visualization, you can move your entire data wrangling pipeline to JavaScript and work more effectively. [Data Wrangling with JavaScript](http://bit.ly/2t2cJu2) teaches you core data munging techniques in JavaScript, along with many libraries and tools that will make your data tasks even easier.

## Setup

Clone the repo to your local hard drive and change directory to the repo.

No dependencies are required.

## Run

To determine the largest amount of memory that can be allocated in Node.js run:

    node index.js

Let this run for a while and it will eventually abort with a fatal out of memory error like this:

    FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory

The last line of text printed tells you the total amount of heap memory available to your application under Node.js.

Now try increasing heap memory, add the '--max-old-space-size' command line parameter as follows and run it again:

    node --max-old-space-size=6000 index.js

You should now have much more heap memory to play with!
