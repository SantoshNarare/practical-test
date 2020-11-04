import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Item, Segment } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

import HttpCall from '../share/HttpCall';
import CreateBlog from './CreateBlog';

const Home = () => {
  const [open, setOpen] = useState(false)
  const [updateBlog, setUpdateBlog] = useState('')
  const [Blogs, setBlog] = useState([])
  const history = useHistory();

  const getData = () => {
    const user = localStorage.getItem('accessToken');
    if (!user) {
      history.push('/');
    }
    (async () => {
      const blogs = await HttpCall({ url: '/api/blog' });
      if (blogs && blogs.data) {
        setBlog(blogs.data);
      }
    })();
  }

  const onDelete = async (id) => {
    if (id) {
      const blogs = await HttpCall({ url: `/api/blog/${id}`, method: 'DELETE' });
      if (blogs && blogs.message) {
        getData();
        toast(blogs.message, { type: 'success' });
      }
    }
  }

  const onUpdate = (blog) => {
    if (blog) {
      setUpdateBlog(blog);
      setOpen(true);
    }
  }

  useEffect(getData, []);

  return (
    <>
      <Segment>
        <Header>Blogs
          <Button onClick={() => {
            setUpdateBlog('');
            setOpen(true)
          }} floated="right" primary>
            Create blog
          </Button>
        </Header>
        <CreateBlog updateBlog={updateBlog} open={open} setOpen={setOpen} reloadData={getData} />
      </Segment>
      <Segment>
        <Item.Group>
          {Blogs.map((blog) => {
            return (
              <Segment key={blog._id}>
                <Item>

                  <Item.Content>
                    <Header>{blog.title}</Header>
                    <Item.Description>
                      <p>
                        {blog.description}
                      </p>
                    </Item.Description>
                  </Item.Content>
                </Item>
                <Segment>
                  <Button onClick={() => onUpdate(blog)} color='teal'>Update</Button>
                  <Button onClick={() => onDelete(blog._id)} color='red'>Delete</Button>
                </Segment>
              </Segment>
            )
          })}
        </Item.Group>
      </Segment>
    </>
  );
}

export default Home;