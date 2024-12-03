import {FC, PropsWithChildren} from "react";
import {IPost} from "../../interfaces/postInterface";
import style from './Post.module.css'

interface IProps extends PropsWithChildren {
    post: IPost
}

const Post: FC<IProps> = ({post}) => {
    const {id, title, body} = post;
    return (
        <div className={style.Post}>
            <div>id: {id}</div>
            <div>title: {title}</div>
            <div>body: {body}</div>
        </div>
        );
    };

export {Post};