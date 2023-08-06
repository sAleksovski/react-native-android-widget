---
sidebar_position: 7
sidebar_label: Limitations
---

# Limitations

There are some limitations to this library.

We cannot render React Native views directly to the widget.
What this library does is render the React Native views to an image, and then show that image in the widget.
For it to look good, we need to know the **exact** size of the widget, so we can create an image that will fit the widget correctly.

On some Android launchers, the reported and actual size of the widget are not always the same.


<figure className="image-caption">

![Actual size](https://user-images.githubusercontent.com/7473800/244463696-2c017d1a-34b8-4a20-9f2e-22b4a3d9a739.png)

<figcaption>Actual size (365dp x 318dp)</figcaption>
</figure>

<figure className="image-caption">

![Reported size](https://user-images.githubusercontent.com/7473800/244463758-534f54a0-f3d2-4a0f-aaaa-0f2c5fc259b8.png)

<figcaption>Reported size (365dp x 354dp)</figcaption>
</figure>

I haven't found a reliable way to get the **exact** size, the current behavior is to crop the widget if the reported size is smaller.
