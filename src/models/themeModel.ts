export interface themeModel {
  primaryColor: string
  secundaryColor: string
  backgroundLogin: string
  borderColor: string
  textColorLogin: string
  background: string
  textColor: string
  tabNav: string
  iconTabNav: string
  reverseColor: string
  gray: string
  white: string
}

export interface MainLoginProps {
  theme: themeModel
}

export interface ImageLoginProps {
  show: boolean;
  type: "banner" | "logo";
}
