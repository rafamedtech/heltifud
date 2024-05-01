type Step = {
  title: string;
  description: string;
  button: {
    label: string;
    icon: string;
    click: () => void;
  };
  image: string;
};
