<template>
    <div>
        <b-button-group size="lg">
            <b-button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :variant="buttonVarient">
                H1
            </b-button>
            <b-button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :variant="buttonVarient">
                H2
            </b-button>
            <b-button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :variant="buttonVarient">
                H3
            </b-button>
            <b-button @click="editor.chain().focus().toggleBold().run()" :variant="buttonVarient"
                :pressed="editor.isActive('bold')">
                <b-icon icon="type-bold" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleItalic().run()" :variant="buttonVarient"
                :pressed="editor.isActive('italic')">
                <b-icon icon="type-italic" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleStrike().run()" :variant="buttonVarient"
                :pressed="editor.isActive('strike')">
                <b-icon icon="type-strikethrough" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleCodeBlock().run()" :variant="buttonVarient"
                :pressed="editor.isActive('codeBlock')">
                <b-icon icon="code-slash" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleBlockquote().run()" :variant="buttonVarient"
                :pressed="editor.isActive('blockquote')">
                <b-icon icon="blockquote-left" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleBulletList().run()" :variant="buttonVarient"
                :pressed="editor.isActive('bulletList')">
                <b-icon icon="list-ul" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleOrderedList().run()" :variant="buttonVarient"
                :pressed="editor.isActive('orderedList')">
                <b-icon icon="list-ol" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().sinkListItem('listItem').run()" :variant="buttonVarient"
                :disabled="!editor.can().sinkListItem('listItem')">
                <b-icon icon="text-indent-left" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().liftListItem('listItem').run()" :variant="buttonVarient"
                :disabled="!editor.can().liftListItem('listItem')">
                <b-icon icon="text-indent-right" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setTextAlign('left').run()" :variant="buttonVarient"
                :pressed="editor.isActive({ textAlign: 'left' })">
                <b-icon icon="text-left" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setTextAlign('center').run()" :variant="buttonVarient"
                :pressed="editor.isActive({ textAlign: 'center' })">
                <b-icon icon="text-center" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setTextAlign('right').run()" :variant="buttonVarient"
                :pressed="editor.isActive({ textAlign: 'right' })">
                <b-icon icon="text-right" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setTextAlign('justify').run()" :variant="buttonVarient"
                :pressed="editor.isActive({ textAlign: 'justify' })">
                <b-icon icon="justify" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setHardBreak().run()" :variant="buttonVarient">
                break
            </b-button>
            <b-button @click="editor.chain().focus().setHorizontalRule().run()" :variant="buttonVarient">
                <b-icon icon="dash-lg" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="addImg()" :variant="buttonVarient">
                Add Img
            </b-button>
        </b-button-group>
    </div>
</template>

<script>
export default {
    name: "editorElements",
    props: {
        editor: {
            type: Object
        },
    },
    data() {
        return {
            buttonVarient: "outline-dark"
        }
    },
    methods: {
        addImg() {
            this.$emit('img');
            console.log('%ceditorElements.vue line:93 true', 'color: #007acc;', true);

        }
    },
}
</script>

<style ></style>