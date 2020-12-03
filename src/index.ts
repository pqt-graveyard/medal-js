import axios, { AxiosInstance } from 'axios';
import { configureOptions } from './options';

export class Medal {
  #api: AxiosInstance;

  /**
   * @param token the public (pub_***) or private (priv_***) token used to authenticate the requests.
   * @param apiVersion the version identifier used to prefix all endpoint URIs (currently only v1 is avaiable)
   */
  constructor(token: string, apiVersion = 'v1') {
    this.#api = axios.create({
      baseURL: `https://developers.medal.tv/${apiVersion}`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  }

  get categories() {
    return this.#api.get<MedalAPI.CategoryResponse>('/categories');
  }

  public latest(options: MedalAPI.LatestOptions = {}) {
    return this.#api.get<MedalAPI.LatestResponse>('/latest', {
      params: {
        ...configureOptions(options),
      },
    });
  }

  public search(options: MedalAPI.SearchOptions) {
    return this.#api.get<MedalAPI.SearchResponse>('/search', {
      params: {
        ...configureOptions(options),
      },
    });
  }

  public trending(options: MedalAPI.TrendingOptions = {}) {
    return this.#api.get<MedalAPI.TrendingResponse>('/trending', {
      params: {
        ...configureOptions(options),
      },
    });
  }
}

/**
 * If you are building a frontend-only application, such as our office feed, you’ll want to generate an API key for public use. You are fine to expose these to users, as their rate limits will be on a per-IP basis.
 *
 * Public use API keys can not be granted special privileges.
 */
export const generatePublicKey = async () => {
  const response = await axios.get('https://developers.medal.tv/v1/generate_public_key');
  const keyRegex = new RegExp('pub_.*').exec(response.data);

  if (keyRegex !== null) {
    return {
      ...response,
      data: keyRegex[0],
    };
  } else {
    throw {
      message: 'Something went wrong trying to fetch a generated public key for the Medal API',
    };
  }
};

/**
 * Keys for private use can be whitelisted for special privileges. You typically deploy these in backend applications, and make sure your users don’t see them. The rate limits for these keys are on a per-key basis, which means you can not deploy them in front-end applications
 *
 * If you want more customized access, such as to raw file URLs for your tournaments, or increased limits, you may request so by filling out this form: https://docs.google.com/forms/d/e/1FAIpQLSeLxbs1UchRGT6Nb6WYD_0gO7821SbRrAnDYjqVOXNrPBrJ4g/viewform
 */
export const generatePrivateKey = async () => {
  const response = await axios.get('https://developers.medal.tv/v1/generate_private_key');
  const keyRegex = new RegExp('priv_.*').exec(response.data);

  if (keyRegex !== null) {
    return {
      ...response,
      data: keyRegex[0],
    };
  } else {
    throw {
      message: 'Something went wrong trying to fetch a generated private key for the Medal API',
    };
  }
};

export default Medal;
