import React, { useState } from 'react';
import { Button, Form, Dimmer, TextArea, Segment, Modal, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import HttpCall from '../share/HttpCall';

const CreateBlog = ({ setOpen, open, reloadData, updateBlog }) => {
  const [userData, setUserData] = useState(updateBlog || {});
  const [loading, setLoading] = useState(false);

  console.log(updateBlog);
  const onChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit = async () => {
    if (!userData.title || !userData.description) {
      toast('required all fields', { type: 'error' });
    } else {
      setLoading(true);
      if (updateBlog._id) {
        await HttpCall({ url: `/api/blog/${updateBlog._id}`, data: userData, method: 'PUT' });
      } else {
        await HttpCall({ url: '/api/blog', data: userData, method: 'POST' });
      }
      await reloadData();
      setLoading(false);
      setOpen(false)
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      closeOnDimmerClick={false}
    >
      <Modal.Header>Create Blog</Modal.Header>
      <Modal.Content>
        <Segment>
          <Dimmer active={loading}>
            <Loader />
          </Dimmer>

          <Form size='large'>
            <Form.Input
              placeholder='Blog Title'
              name='title'
              onChange={onChange}
              value={userData.title}
            />
            <TextArea
              placeholder='Blog Discription'
              name='description'
              style={{ minHeight: 100 }}
              onChange={onChange}
              value={userData.description}
            />

          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, Create one"
          labelPosition='right'
          icon='checkmark'
          onClick={onSubmit}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CreateBlog;
