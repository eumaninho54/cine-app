export interface MainLoginProps {
  theme: {
    primaryColor: string
    backgroundLogin: string
    textColorLogin: string
    background: string
    textColor: string
    tabNav: string
    iconTabNav: string
    reverseColor: string
    gray: string
    white:string
  };
}

export interface ImageLoginProps {
  show: boolean;
  type: "banner" | "logo";
}
