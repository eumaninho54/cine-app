export interface MainLoginProps {
  theme: {
    primaryColor: string
    backgroundLogin: string
    background: string
    tabNav: string
    iconTabNav: string
    color: string
    reverseColor: string
  };
}

export interface ImageLoginProps {
  show: boolean;
  type: "banner" | "logo";
}
