/**
 * Type of Block Group in Content Model
 *
 * (This is a temporary file, later we will delete it and let build script generate it instead)
 */
export enum CompatibleContentModelBlockGroupType {
    /**
     * Represents the document entry of Content Model
     */
    Document,

    /**
     * Represents a Quote element
     */
    Quote,

    /**
     * Represents a Code element
     */
    Code,

    /**
     * Represents a header element (H1, H2, ..., H6)
     */
    Header,

    /**
     * Represents a list item (LI) element
     */
    ListItem,

    /**
     * Represents a table cell (TD, TH) element
     */
    TableCell,

    /**
     * Represents a general HTML element that doesn't have a special type
     */
    General,
}
