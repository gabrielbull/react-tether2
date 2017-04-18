export as namespace ReactTether;
export = ReactTether;

import {Component, ReactElement, ReactNode, ComponentState, ComponentClass, ClassType} from 'react';

declare namespace ReactTether {
  type TetherAttachment =
    'bottom left' | 'bottom center' | 'bottom right' |
    'middle left' | 'middle center' | 'middle right' |
    'top left' | 'top center' | 'top right';

  type TetherConstraint = {
    to?: 'scrollParent' | 'window';
    attachment?:
      'element' | 'target' | 'both' | 'together' | 'none' |
      'element element' | 'element target' | 'element both' | 'element together' | 'element none' |
      'target element' | 'target target' | 'target both' | 'target together' | 'target none' |
      'both element' | 'both target' | 'both both' | 'both together' | 'both none' |
      'together element' | 'together target' | 'together both' | 'together together' | 'together none' |
      'none element' | 'none target' | 'none both' | 'none together' | 'none none';
    pin?: boolean | Array<'top' | 'middle' | 'bottom' | 'left' | 'center' | 'right'>;
    outOfBoundsClass?: string;
    pinnedClass?: string;
  };

  type TetherSpec = {
    target: ReactNode | ReactElement | HTMLElement;
    attachment?: TetherAttachment;
    targetAttachment?: TetherAttachment;
    offset?: string;
    targetOffset?: string;
    targetModifier?: 'visible' | 'scroll-handle';
    enabled?: boolean;
    classes?: { [key: string]: string };
    classPrefix?: string;
    constraints?: Array<TetherConstraint>;
    optimizations?: {
      moveElement?: boolean;
      gpu?: boolean;
    };
  };

  type TetherState = Array<
    'elementAttachedLeft' |
    'elementAttachedRight' |
    'elementAttachedTop' |
    'elementAttachedBottom' |
    'elementAttachedMiddle' |
    'elementAttachedCenter' |
    'targetAttachedLeft' |
    'targetAttachedRight' |
    'targetAttachedTop' |
    'targetAttachedBottom' |
    'targetAttachedMiddle' |
    'targetAttachedCenter'
    >;

  export default function tether<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
    options: (ownProps: any) => TetherSpec,
    mapStateToProps?: (state: TetherState, ownProps: any, tether: any) => void,
    props?: any
  ): ClassType<P, T, C>
}
