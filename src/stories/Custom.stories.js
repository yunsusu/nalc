import { CustomButton } from "../components/Custom/index.tsx";
import { within, userEvent } from "@storybook/testing-library";

// export default {
//   title: "Test/CustomButton",
//   component: CustomButton,
// };

export default {
  title: "Test/CustomButton",
  component: CustomButton,
  args: {
    label: "Button",
  },
  // parameters: {
  //   backgrounds: {
  //     values: [
  //       {
  //         name: "blue",
  //         value: "blue",
  //       },
  //       {
  //         name: "red",
  //         value: "red",
  //       },
  //     ],
  //   },
  // },
};

export const Solid = {
  args: {
    variant: "solid",
    label: "Button",
  },
};

export const Outline = {
  args: {
    variant: "outline",
    label: "Button",
  },
};

export const Small = {
  args: {
    size: "sm",
    label: "Button",
  },
};

export const Medium = {
  args: {
    size: "md",
    label: "Button",
  },
};

export const Large = {
  args: {
    size: "lg",
    label: "Button",
  },
};

export const ClickTestButton = {
  args: {
    variant: "outline",
    label: "Click!",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const primaryButton = await canvas.getByRole("button", {
      name: /Click/i,
    });
    await userEvent.click(primaryButton);
  },
};
