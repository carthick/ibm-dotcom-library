import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_FEATURED_LINK } from '../../../internal/FeatureFlags';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import './index.scss';
import FeaturedLink from '../FeaturedLink';
import readme from '../README.md';
import './index.scss';

if (DDS_FEATURED_LINK) {
  storiesOf('Featured Links', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'Pattern title(required):',
        'How is artificial intelligence used today in your industry?'
      );

      const content = [
        {
          title: text('Card1 Title:', 'Explore AI use cases in all industries'),
          link: {
            target: text('Card1 link target:', '_blank'),
            href: text('Card1 link href:', 'https://www.ibm.com'),
          },
        },
      ];

      const images = {
        mobile: 'https://picsum.photos/id/2/320/370',
        tablet: 'https://picsum.photos/id/2/672/400',
        default: 'https://picsum.photos/id/2/672/400',
        alt: 'lead space image',
      };

      return (
        <FeaturedLink
          title={title}
          content={content}
          image={object('image', images)}
        />
      );
    });
}
