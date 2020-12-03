type Category = {
  categoryId: number;
  categoryName: string;
  alternativeName: string;
  activeSessions: number;
  slug: string;
};

type ContentResource = {
  contentId: string;
  rawFileUrl: string;
  rawFileUrlLowRes: string;
  unbrandedFileUrl: string;
  contentTitle: string;
  contentViews: number;
  contentLikes: number;
  contentThumbnail: string;
  categoryId: number;
  videoLengthSeconds: number;
  createdTimestamp: number;
  directClipUrl: string;
  embedIframeCode: string;
  credits: string;
};

type ContentObjects<T = ContentResource> = {
  contentObjects: T;
};

declare namespace MedalAPI {
  type Options = {
    /**
     * Adds the Steam App Id to every link and iframe returned, so users viewing and sharing the clip can get the game on steam
     */
    steamappid?: number;

    /**
     * Hide donation buttons or user-generated call-to-actions on the clip
     */
    cta?: 0 | 1;

    /**
     * Specify whether whe iframes returned contain the autoplay tag
     */
    autoplay?: 0 | 1;

    /**
     * Specify whether the iframes returned loop content
     */
    loop?: 0 | 1;

    /**
     * Specify whether the iframes returned should auto-play sound. By default it does not.
     */
    muted?: 0 | 1;

    /**
     * The height of the returned clip player
     */
    width?: number;

    /**
     * The width of the returned clip player
     */
    height?: number;

    /**
     * Whether we should return a custom class identifier for your medal clip iframe. By default we add a class called `medal-clip` and an id called `contentId-$contentId`
     */
    customStyleClass?: string;
  };

  type CategoryResponse = Category[];

  type LatestOptions = Options & {
    /**
     * Filter by a users's unique ID.
     */
    userId?: number;

    /**
     * Filter by a game's unique ID.
     */
    categoryId?: number;

    /**
     * How many objects to return. By default you have access to 1000 objects per query
     */
    limit?: number;

    /**
     * How many objects to skip. limit + offset can not exceed 1000 by default.
     */
    offset?: number;
  };
  type LatestResponse = ContentObjects;

  type SearchOptions = Options & {
    /**
     * The search query applied to the clips titles
     */
    text: string;

    /**
     * How many objects to return. By default you have access to 1000 objects per query
     */
    limit?: number;

    /**
     * How many objects to skip. limit + offset can not exceed 1000 by default.
     */
    offset?: number;
  };
  type SearchResponse = ContentObjects;

  type TrendingOptions = Options & {
    /**
     * Filter by a game's unique ID.
     */
    categoryId?: number;

    /**
     * How many objects to return. By default you have access to 1000 objects per query
     */
    limit?: number;

    /**
     * How many objects to skip. limit + offset can not exceed 1000 by default.
     */
    offset?: number;
  };
  type TrendingResponse = ContentObjects;
}
