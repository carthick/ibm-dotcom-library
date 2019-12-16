/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { DDS_FEATURED_LINK } from '../../internal/FeatureFlags';
// import CardArrayItem from './CardArrayItem';
import FeaturedLinkItem from './FeaturedLinkItem';
import FeaturedLinkImage from './FeaturedLinkImage';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * Featured Link Component
 *
 * @param {object} images props object
 * @returns {*} FeaturedLink JSX component
 */
const sortImages = images => {
  return [
    {
      minWidth: 1056,
      url: images.default,
    },
    {
      minWidth: 672,
      url: images.tablet,
    },
    {
      minWidth: 320,
      url: images.mobile,
    },
  ];
};

/**
 * Featured Link Component
 *
 * @param {object} props props object
 * @param {string} props.title FeaturedLink section title
 * @param {Array} props.content FeaturedLink section content object array
 * @returns {*} FeaturedLink JSX component
 */
const FeaturedLink = ({ title, content, image }) => {
  console.log(typeof image);
  useEffect(() => {
    let biggest = 0;
    const links = Array.prototype.slice.call(
      document.querySelectorAll(
        `[data-autoid=${stablePrefix}--featuredlink-item]`
      )
    );
    links.forEach(link => {
      if (link.offsetHeight > biggest) {
        biggest = link.offsetHeight;
      }
    });
  });

  return featureFlag(
    DDS_FEATURED_LINK,
    <section
      className={`${prefix}--featuredlink`}
      data-autoid={`${stablePrefix}--featuredlink`}>
      <div className={`${prefix}--featuredlink__container`}>
        <div className={`${prefix}--featuredlink__col`}>
          <h3 className={`${prefix}--featuredlink__title`}>{title}</h3>
        </div>
        <div className={`${prefix}--featuredlink__row`}>
          <div className={`${prefix}--featuredlink__col`}>
            {image && (
              <FeaturedLinkImage
                images={sortImages(image)}
                defaultImage={image.default}
                alt={image.alt}
              />
            )}
          </div>
          <div className={`${prefix}--featuredlink__row`}>
            {_renderFeaturedLinkItems(content)}
          </div>
        </div>
        <div className={`${prefix}--featuredlink__divider__col`}>
          <div className={`${prefix}--featuredlink__divider`}></div>
        </div>
      </div>
    </section>
  );
};

/**
 * Renders the cards based on the ContentArray entries
 *
 * @param {Array} contentArray Content object array
 * @returns {*} CardArrayItem JSX objects
 */
const _renderFeaturedLinkItems = contentArray =>
  contentArray.map(elem => (
    <FeaturedLinkItem title={elem.title} copy={elem.copy} link={elem.link} />
  ));

FeaturedLink.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      link: PropTypes.shape({
        icon: PropTypes.string,
        target: PropTypes.string,
        href: PropTypes.string,
      }),
    })
  ),
};

export default FeaturedLink;
