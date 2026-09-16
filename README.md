# Color Combo Carousel

Ever needed the _perfect_ combination of two colors for a theme?
No idea where to look? Not anymore!
Here's my take on an inspiration to find nice color combinations for your next project...

Get 10 matching color combos each time you hit the randomize button and store your favorites.

Let me know, which combinations you liked the most!

![Color Combo Carousel](screenshot.jpg)

Live demo: https://justsomebody42.github.io/color-combos-carousel/

## Running with Docker

Example `docker-compose.yml` pulls the prebuilt public image from GitHub Container Registry:

```
docker compose up -d
```

Then open http://localhost:8080.

To build and run the image locally instead of pulling from the registry:

```
docker build -t color-combos-carousel .
docker run -p 8080:8080 color-combos-carousel
```
