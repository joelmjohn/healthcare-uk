<template>
    <div>
        <b-button-group size="lg">
            <b-button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :variant="buttonVariant">
                H1
            </b-button>
            <b-button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :variant="buttonVariant">
                H2
            </b-button>
            <b-button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :variant="buttonVariant">
                H3
            </b-button>
            <b-button @click="editor.chain().focus().toggleBold().run()" :variant="buttonVariant"
                :pressed="editor.isActive('bold')">
                <b-icon icon="type-bold" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleItalic().run()" :variant="buttonVariant"
                :pressed="editor.isActive('italic')">
                <b-icon icon="type-italic" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleStrike().run()" :variant="buttonVariant"
                :pressed="editor.isActive('strike')">
                <b-icon icon="type-strikethrough" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleCodeBlock().run()" :variant="buttonVariant"
                :pressed="editor.isActive('codeBlock')">
                <b-icon icon="code-slash" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleBlockquote().run()" :variant="buttonVariant"
                :pressed="editor.isActive('blockquote')">
                <b-icon icon="blockquote-left" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleBulletList().run()" :variant="buttonVariant"
                :pressed="editor.isActive('bulletList')">
                <b-icon icon="list-ul" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().toggleOrderedList().run()" :variant="buttonVariant"
                :pressed="editor.isActive('orderedList')">
                <b-icon icon="list-ol" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().sinkListItem('listItem').run()" :variant="buttonVariant"
                :disabled="!editor.can().sinkListItem('listItem')">
                <b-icon icon="text-indent-left" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().liftListItem('listItem').run()" :variant="buttonVariant"
                :disabled="!editor.can().liftListItem('listItem')">
                <b-icon icon="text-indent-right" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setTextAlign('left').run()" :variant="buttonVariant"
                :pressed="editor.isActive({ textAlign: 'left' })">
                <b-icon icon="text-left" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setTextAlign('center').run()" :variant="buttonVariant"
                :pressed="editor.isActive({ textAlign: 'center' })">
                <b-icon icon="text-center" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setTextAlign('right').run()" :variant="buttonVariant"
                :pressed="editor.isActive({ textAlign: 'right' })">
                <b-icon icon="text-right" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setTextAlign('justify').run()" :variant="buttonVariant"
                :pressed="editor.isActive({ textAlign: 'justify' })">
                <b-icon icon="justify" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="editor.chain().focus().setHardBreak().run()" :variant="buttonVariant">
                break
            </b-button>
            <b-button @click="editor.chain().focus().setHorizontalRule().run()" :variant="buttonVariant">
                <b-icon icon="dash-lg" aria-hidden="true"></b-icon>
            </b-button>
            <b-button @click="addImg()" :variant="buttonVariant">
                <b-icon icon="image" aria-hidden="true"></b-icon>
            </b-button>
            <b-button :variant="buttonVariant">
                <input type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
                    :value="editor.getAttributes('textStyle').color">
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
            buttonVariant: "dark"
        }
    },
    methods: {
        addImg() {
            this.$emit('img');
        }
    },
}
</script>

<style scoped></style>