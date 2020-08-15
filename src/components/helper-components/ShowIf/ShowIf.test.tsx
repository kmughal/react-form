import React from 'react';
import { ShowIfProps } from '.';
import render from '../../../../bin/render';
import { Form, FormProps, TextBox } from '../../basic-components';
import BaseComponentProps from '../../basic-components/BaseComponent.Props';
import PubSub from '../../basic-components/Form/PubSub';
import ShowIf from './ShowIf';

describe('ShowIf Components', () => {
  it('when ShowIfCallBack returns true value then component must be rendered', () => {
    const formProps: FormProps = {
      submitForm: (data) => {},
      pubsub: new PubSub(),
    };
    const showIfProps: ShowIfProps = {
      id: 'dummy_show_if',
      eventName: 'hello',
      showIfCallback: (data) => true,
    };

    const { getByText, getById, triggerEvent } = render(
      <Form formProps={formProps}>
        <ShowIf showIfProps={showIfProps}>
          <div>this is a test</div>
        </ShowIf>
        <div>
          <button
            id="btn"
            onClick={(e) => {
              formProps.pubsub.publish('hello', null);
            }}
          >
            Click
          </button>
        </div>
      </Form>
    );

    const btn = getById('btn');
    triggerEvent('click', btn);

    expect(getByText('this is a test')).toBeTruthy();
  });

  it('when ShowIfCallBack returns false value then component should not be rendered', () => {
    const formProps: FormProps = {
      submitForm: (data) => {},
      pubsub: new PubSub(),
    };
    const showIfProps: ShowIfProps = {
      id: 'dummy_show_if',
      eventName: 'hello',
      showIfCallback: (data) => false,
    };

    const { getByText, getById, triggerEvent } = render(
      <Form formProps={formProps}>
        <ShowIf showIfProps={showIfProps}>
          <div>this is a test</div>
        </ShowIf>
        <div>
          <button
            id="btn"
            onClick={(e) => {
              formProps.pubsub.publish('hello', null);
            }}
          >
            Click
          </button>
        </div>
      </Form>
    );

    const btn = getById('btn');
    triggerEvent('click', btn);
    expect(getByText('this is a test')).toBeFalsy();
  });
});
