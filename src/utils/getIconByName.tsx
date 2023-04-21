export enum IconName {
  MOVIE = 'Movie',
  TV = 'TV Serie',
  PLAY = 'Play',
  SEARCH = 'Search',
  BOOKMARK = 'Bookmark',
  HOME = 'Home',
  LOGO = 'Logo',
  AVATAR = 'Avatar',
}

export const getIconByName = (name: IconName) => {
  switch (name) {
    case IconName.MOVIE:
      return (
        <path
          d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.045 3.045 0 0 0 20 16.956V3.044A3.045 3.045 0 0 0 16.956 0ZM4 9H2V7h2v2Zm0 2H2v2h2v-2Zm14-2h-2V7h2v2Zm0 2h-2v2h2v-2Zm0-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM4 2H2.74a.74.74 0 0 0-.74.74V4h2V2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm15.26.74a.74.74 0 0 0 .74-.74V16h-2v2h1.26Z"
        />
      )
    
    case IconName.TV:
      return (
        <path
          d="M9.08 4.481H20V20H0V4.481h4.92l-2.7-3.278L3.78.029 7 3.91 10.22 0l1.56 1.203-2.7 3.278ZM2 6.421v11.64h10V6.42H2Zm15 7.76h-2v-1.94h2v1.94Zm-2-3.88h2V8.36h-2v1.94Z"
        />
      )

    case IconName.PLAY:
      return (
        <path 
          d="M0 15C0 6.713 6.713 0 15 0c8.288 0 15 6.713 15 15 0 8.288-6.712 15-15 15-8.287 0-15-6.712-15-15Zm21-.5L12 8v13l9-6.5Z" 
        />
      )

    case IconName.BOOKMARK:
      return (
        <path
          d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82V18.52c0 .3-.086.572-.258.82a1.49 1.49 0 0 1-.694.541 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.482c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z"
        />
      )

    case IconName.HOME:
      return (
        <path
          d="M1 0h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1Zm0 11h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H1c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm-7 11h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-7c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1Z"
        />
      )

    case IconName.SEARCH:
      return (
        <path
          d="m17.31 15.9 3.4 3.39a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0l-3.39-3.4A7.92 7.92 0 0 1 11 19a8 8 0 1 1 8-8 7.92 7.92 0 0 1-1.69 4.9ZM11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
        />
      )

    case IconName.LOGO:
      return (
        <path
          d="m25.6 0 3.2 6.4H24L20.8 0h-3.2l3.2 6.4H16L12.8 0H9.6l3.2 6.4H8L4.8 0H3.2A3.186 3.186 0 0 0 .016 3.2L0 22.4a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V0h-6.4Z"
        />
      )

    case IconName.AVATAR:
      return (
        <path
          d="M12 14.016c2.672 0 8.016 1.313 8.016 3.984v2.016H3.985V18c0-2.672 5.344-3.984 8.016-3.984zM12 12c-2.203 0-3.984-1.781-3.984-3.984S9.797 3.985 12 3.985s3.984 1.828 3.984 4.031S14.203 12 12 12z"
        />
      )

    default:
      return;
  }
}