<template>
    <div class="blog-page">
        <div class="text-center">
            <h1>Create Blogpost</h1>
        </div>
        <div class="editor-selector">
            <EditorElements :editor="editor" @img="addImage" />
        </div>
        <br />
        <editor-content :editor="editor" v-model="html" />
    </div>
</template>

<script>
import EditorElements from './editorElements.vue'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

export default {
    name: "blogpost",
    components: {
        EditorContent, EditorElements
    },
    data() {
        return {
            editor: new Editor({
                content: `<h1>Blogpost Title</h1><hr/>
                <h2><p>Welcome to the testing on new blogPost</p></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                <p>Some examples like</p>
                <ul><li><p> Ut enim ad minim veniam</p></li><li><p> quis nostrud exercitation ullamco</p></li><li><p> laboris nisi ut aliquip ex ea commodo </p></li><li><p>consequa</p></li></ul>
                <h3 style="text-align: center"><i>you can add you content however you like</i></h3>
                `,
                extensions: [
                    StarterKit,
                    TextAlign.configure({
                        types: ['heading', 'paragraph'],
                    }),
                    Image
                ],
            }),
            html: ''
        }
    },
    methods: {
        addImage() {
            alert('img');
            //this.content += `<img src="https://source.unsplash.com/8xznAGy4HcY/800x400"/>`;
            console.log('%cindex.vue line:50 this.editor', 'color: #007acc;', this.editor);
        }
    },
    mounted() {

    }
}
</script>

<style>
.blog-page {
    padding: 20px;

}

.ProseMirror {
    background-color: rgb(253, 253, 253);
    border-radius: 0.5rem;
    padding: 0.75rem;
}

.editor-selector {
    border: 5px solid rgb(236, 236, 236);
    border-radius: 0.5rem;
    padding: 0.75rem;
    text-align: center;
}

.editor-selector:hover {
    border: 5px solid rgb(182, 182, 182);
}
</style>