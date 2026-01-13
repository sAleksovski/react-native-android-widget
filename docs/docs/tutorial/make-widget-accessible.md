---
sidebar_position: 8
---

# Make widget accessible

We can make the widget accessible, so that users using screen readers know what is rendered, and what actions are available.

We can add the `accessibilityLabel` prop to several places:

## The root widget component

This is the top-level primitive that is used to define the widget

```jsx title="HelloWidget.tsx"
export function HelloWidget() {
  return (
    <FlexWidget
      style={{ ... }}
      accessibilityLabel="Hello world widget"
    >
      <TextWidget
        text="Hello"
        style={{ ... }}
      />
    </FlexWidget>
  );
}
```

## Component that has `clickAction` prop

```jsx title="CounterWidget.tsx"
export function CounterWidget() {
  return (
    <FlexWidget
      style={{ ... }}
    >
      <FlexWidget
        style={{ ... }}
        clickAction="INCREMENT"
        clickActionData={{ value: count }}
        accessibilityLabel="Increment the value"
      >
        <TextWidget style={{ ... }} text="+" />
      </FlexWidget>
    </FlexWidget>
  );
}
```

## List items

```jsx title="EmailWidget.tsx"
export function EmailWidget() {
  return (
    <FlexWidget
      style={{ ... }}
    >
      <ListWidget
        style={{ ... }}
      >
        <FlexWidget
          style={{ ... }}
          accessibilityLabel={`Email 1 of 2, title: React Native Android Widget Release 0.1`}
        >
          <TextWidget style={{ ... }} text="React Native Android Widget Release 0.1" />
        </FlexWidget>
        <FlexWidget
          style={{ ... }}
          accessibilityLabel={`Email 2 of 2, title: React Native Android Widget Release 0.2`}
        >
          <TextWidget style={{ ... }} text="React Native Android Widget Release 0.2" />
        </FlexWidget>
      </ListWidget>
    </FlexWidget>
  );
}
```

## Combined example

```jsx title="EmailWidget.tsx"
export function EmailWidget() {
  return (
    <FlexWidget
      style={{ ... }}
      accessibilityLabel="Email widget"
    >
      <IconWidget
        icon="edit"
        font="material_outlined"
        style={{ ... }}
        clickAction="COMPOSE"
        accessibilityLabel="Compose new email"
      />
      <ListWidget
        style={{ ... }}
      >
        <FlexWidget
          style={{ ... }}
          accessibilityLabel={`Email 1 of 2, title: React Native Android Widget Release 0.1`}
        >
          <TextWidget style={{ ... }} text="React Native Android Widget Release 0.1" />
          <IconWidget
            icon="archive"
            font="material_outlined"
            clickAction="ARCHIVE"
            clickActionData={{ listItemId: 1 }}
            accessibilityLabel="Archive email"
          />
        </FlexWidget>
        <FlexWidget
          style={{ ... }}
          accessibilityLabel={`Email 2 of 2, title: React Native Android Widget Release 0.2`}
        >
          <TextWidget style={{ ... }} text="React Native Android Widget Release 0.2" />
          <IconWidget
            icon="archive"
            font="material_outlined"
            clickAction="ARCHIVE"
            clickActionData={{ listItemId: 2 }}
            accessibilityLabel="Archive email"
          />
        </FlexWidget>
      </ListWidget>
    </FlexWidget>
  );
}
```
